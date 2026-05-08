import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  register(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password
    });
  }

  logout() {
    return this.supabase.auth.signOut();
  }

  async saveProfile(userId: string, nombre: string, email: string) {
  return await this.supabase
    .from('profiles')
    .upsert({
      id: userId,
      nombre: nombre,
      email: email
    });
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  
}