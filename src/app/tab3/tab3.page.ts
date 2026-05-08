import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SupabaseService } from '../services/superbase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonImg,
    IonItem,
    IonLabel,
    IonText,
    FormsModule

  ]
})
export class Tab3Page {

  nombre = '';
  email = '';

  userId = ''; // lo sacas del login
  fotoPerfil: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  async guardarPerfil() {

    const { data: user } = await this.supabaseService.getUser();

    if (!user?.user?.id) {
      console.log('Usuario no encontrado');
      return;
    }

    this.userId = user.user.id;

    const { error } = await this.supabaseService.saveProfile(
      this.userId,
      this.nombre,
      this.email
    );

    if (error) {
      console.log('Error:', error.message);
      return;
    }

    console.log('Perfil guardado');
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt // cámara o galería
    });

    this.fotoPerfil = image.webPath!;
  }
}