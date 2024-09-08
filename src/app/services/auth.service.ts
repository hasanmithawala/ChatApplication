import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseurl,
      environment.supabaseKey
    );
    this.supabase.auth.onAuthStateChange((events, session) => {
      console.log(events, session);
    });
  }
  async SigninGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }
  async SignOut() {
    await this.supabase.auth.signOut();
    // the above will clear the localstorage as well as sessionstorage from the users browser
  }
}
// now we can use the above service in our entire application where we need a supabase client
