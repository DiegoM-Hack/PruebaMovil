import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule]

})
export class Tab2Page {
  constructor(public photoService: PhotoService) {}

  // CHANGE: Add call to `loadSaved()` when navigating to the Photos tab
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}