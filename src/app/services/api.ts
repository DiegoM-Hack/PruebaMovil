import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {

  private apiUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) {}

  // Obtener top animes
  getTopAnime(limit: number = 25): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/top/anime?limit=${limit}`
    );
  }

  // Obtener anime por ID
  getAnimeById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/anime/${id}`
    );
  }

  // Obtener personajes del anime
  getAnimeCharacters(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/anime/${id}/characters`
    );
  }

  // Obtener detalles + personajes
  getAnimeDetailsAndCharacters(id: number): Observable<any[]> {
    return forkJoin([
      this.getAnimeById(id),
      this.getAnimeCharacters(id)
    ]);
  }

  // Buscar anime por nombre
  searchAnime(name: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/anime?q=${name}`
    );
  }

  // Obtener anime por género
  getAnimeByGenre(genreId: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/anime?genres=${genreId}`
    );
  }

  // Obtener temporadas actuales
  getCurrentSeason(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/seasons/now`
    );
  }

  // Obtener imagen del anime
  getImageUrl(anime: any): string {
    return anime.images.jpg.image_url;
  }

  // Obtener imagen pequeña
  getThumbUrl(anime: any): string {
    return anime.images.jpg.small_image_url;
  }
}