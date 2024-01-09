import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
// import SignaturePad from 'signature_pad';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  // @Input() id: any;
  form!: FormGroup;
  form1!: FormGroup;
  form2!: FormGroup;
  step = '1'; // Default to first step

  senderData: any[] = [];
  receiverData: any[] = [];
  orderData: any[] = [];
  // signaturePad: SignaturePad;

  postData: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,

    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private platform: Platform,
    private alertCtrl: AlertController
    ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.loadSenderData();
    this.loadReceiverData();
    this.loadOrderData();
  }



  loadSenderData() {
    this.http.get<any[]>('../../../assets/data/sender.json').subscribe(data => {
      this.senderData = data;
      this.createForm(data, 1);
    });
  }

  loadReceiverData() {
    this.http.get<any[]>('../../../assets/data/receiver.json').subscribe(data => {
      this.receiverData = data;
      this.createForm(data, 2);
    });
  }
  loadOrderData() {
    this.http.get<any[]>('../../../assets/data/sales.json').subscribe(data => {
      this.orderData = data;
      this.createForm(data, 3);
    });
  }


  createForm(data: any, formNo: number) {
    const group: { [key: string]: any } = {}; // Define the type of 'group' as an object with string keys and any type of values
    data.forEach((field: { display: any; model: string | number; }) => {
      if (field.display) {
        group[field.model] = ['']; // Now TypeScript knows that 'group' is an object with string keys
      }
    });

    if (formNo == 1) {
      this.form = this.fb.group(group);
    } else if(formNo == 2) {
      this.form1 = this.fb.group(group);
    } else if(formNo == 3) {
      this.form2 = this.fb.group(group);
    }
  }


  clearPad() {
    // this.signaturePad.clear();
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

    this.postData.image = base64Data;

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
}
