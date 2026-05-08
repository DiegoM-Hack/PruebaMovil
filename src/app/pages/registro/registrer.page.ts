import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/superbase.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent
  ]
})
export class RegistrerPage {
  email = '';
  password = '';
  mensaje = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async register() {
    const { error } = await this.supabaseService.register(
      this.email,
      this.password
    );

    if (error) {
      this.mensaje = error.message;
      return;
    }

    this.mensaje = 'Usuario registrado';
  }
}