import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@capacitor/geolocation';


const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.page.html',
  styleUrls: ['./order-update.page.scss'],
})
export class OrderUpdatePage implements AfterViewInit {
    images: LocalFile[] = [];

    // postData: any;

  postData = {
    image: null,
    status: '',
    notes: '',
    signature: '',
    lat: 0,
    lon: 0
  };
    notes = '';

    signaturePad!: SignaturePad;
    @ViewChild('canvas') canvasEl!: ElementRef;
    signatureImg!: string;
    id = this.route.snapshot.paramMap.get('id');
    imageElement = null;
    podImage = null;
    domSanitizer = null;
    constructor(
      private orderService: OrderService,
      private loadingCtrl: LoadingController,
      private route: ActivatedRoute,
      private router: Router,
      private sanitizer: DomSanitizer,
      private platform: Platform,
      private alertCtrl: AlertController
    ) { }

    ngAfterViewInit() {
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
      // this.loadFiles();
    }

    /**** Signature Pad Start ****/

    startDrawing(event: Event) {
      // console.log(event);
      // works in device not in browser

    }

    moved(event: Event) {
      // works in device not in browser
    }

    clearPad() {
      this.signaturePad.clear();
    }

    savePad() {
      const base64Data = this.signaturePad.toDataURL();
      this.postData.signature = base64Data;
    }

    async addNewToGallery() {
      // Take a photo
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        // source: CameraSource.Photos,
        source: CameraSource.Camera,
        quality: 100
      });

      if (image) {
        this.saveImage(image);
      }
    }

    async saveImage(photo: Photo) {
      const base64Data = await this.readAsBase64(photo);
      console.log(base64Data);

      // this.postData.image = base64Data;

      /* const fileName = new Date().getTime() + '.jpeg';
       const saveFile = await Filesystem.writeFile({
         directory: Directory.Data,
         path: `${IMAGE_DIR}/${fileName}`,
         data: base64Data
       });

       console.log('Saved file: ', saveFile);
       this.loadFiles();*/


    }

    async readAsBase64(photo: Photo) {
      // if (this.platform.is('hybrid')) {
      //   const file = await Filesystem.readFile({
      //     path: photo.path
      //   });

      //   return file.data;
      // }
      // else {
      //   // Fetch the photo, read as a blob, then convert to base64 format
      //   const response = await fetch(photo.webPath);
      //   const blob = await response.blob();

      //   return await this.convertBlobToBase64(blob) as string;
      // }
    }

    convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
    /**** Image End ****/



    /**** Upload Start ****/
    async updateStatus(status:any) {
      this.savePad();
      // console.log(status);
      this.postData.status = status;
      // this.postData.notes = this.notes;

      // const data =

      const loading = await this.loadingCtrl.create({
        message: 'Loading',
        spinner: 'lines-small'
      });
      await loading.present();

      setTimeout(() => {
        loading.dismiss();
      }, 1000);

      this.orderService.updateOrder(this.postData, this.id).subscribe((res: any) => {
        loading.dismiss();
        this.router.navigate(['/orders']);
      });
    }
    /**** Upload End ****/

    async deliveryPosition(status:any) {

      const loading = await this.loadingCtrl.create({
        message: 'Loading',
        spinner: 'lines-small'
      });
      await loading.present();

      console.log('Location Req');
      const coordinates = await Geolocation.getCurrentPosition().then((res) => {
        loading.dismiss();
        // console.log('🚀 ~ file: order-update.page.ts ~ line 103 ~ OrderUpdatePage ~ coordinates ~ res', res);
        this.postData.lat = res.coords.latitude;
        this.postData.lon = res.coords.longitude;
        // alert(coordinates);
        this.updateStatus(status);
      });

    }



    async requestCameraPermission() {
      const alert = await this.alertCtrl.create({
        header: 'Camera Access Required',
        message: 'Please grant access to your device\'s camera and files to enable the proof of delivery feature on the app. This feature requires access to your camera to capture images of the delivered package and access to your files to store these images securely. Without access to camera and file data, the proof of delivery feature cannot be used. Your data will not be shared with any third parties. To proceed, please allow camera and file access for the app.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Allow',
            handler: () => {
              this.addNewToGallery(); // Call the camera function here
            }
          }
        ]
      });

      await alert.present();
    }


    async checkPermission() {
      const permission = await Camera.checkPermissions();
      console.log('🚀 ~ file: order-update.page.ts:271 ~ OrderUpdatePage ~ checkPermission ~ permission:', permission);
      if (permission.camera === 'prompt') {
        this.requestCameraPermission();
      } else if(permission.camera === 'granted') {
        this.addNewToGallery();
      }
      // else if(permission.location === 'denied') {
      //   this.presentLocationExplanation();
      // }

    }

  }

