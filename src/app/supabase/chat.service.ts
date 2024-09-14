import { inject, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../interface/chats-response';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase!: SupabaseClient;
  public savedchat = signal({});
  constructor() {
    this.supabase = createClient(
      environment.supabaseurl,
      environment.supabaseKey
    );
  }
  async chatmessages(text: string) {
    try {
      const { data, error } = await this.supabase
        .from('chats')
        .insert({ text });
      if (error) {
        alert(error.message);
      }
      // getting a refrence from of table called chats from supabase
    } catch (err) {
      alert(err);
    }
  }
  async listChat() {
    try {
      const { data, error } = await this.supabase
        .from('chats')
        .select('*,users(*)');
      // the above code is used for selecting all the columns from the chats table and and in chats table it has unique sender id so it will also fetch that user from the users table with that unique sender id
      if (error?.message) {
        alert(error.message);
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
  async deleteChats(id: string) {
    const data = await this.supabase.from('chats').delete().eq('id', id);
    return data;
  }
  selectedChats(msg: Ichat) {
    this.savedchat.set(msg);
    // setting the new message in the signal
  }
}
