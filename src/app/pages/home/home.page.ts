import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonImg,
  IonSearchbar,
  IonButton,
  IonSpinner
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimeService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonImg,
    IonSearchbar,
    IonButton,
    IonSpinner
  ]
})
export class HomePage implements OnInit {

  animes: any[] = [];
  searchText = '';
  loading = false;

  constructor(private animeService: AnimeService, private router: Router) {}

  ngOnInit() {
    this.loadTopAnime();
  }

  async register() {
    this.router.navigateByUrl('/tabs');
  }

  loadTopAnime() {
    this.loading = true;

    this.animeService.getTopAnime().subscribe({
      next: (response) => {
        this.animes = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  searchAnime() {

    if (!this.searchText.trim()) {
      this.loadTopAnime();
      return;
    }

    this.loading = true;

    this.animeService.searchAnime(this.searchText)
      .subscribe({
        next: (response) => {
          this.animes = response.data;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        }
      });
  }
}