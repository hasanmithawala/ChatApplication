import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../Interface/chatresponse';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase!: SupabaseClient;
  public savedChat = signal({});

  constructor() {
    this.supabase = createClient(
      environment.supabaseurl,
      environment.supabaseKey
    );
  }
  async chatMessage(text: string) {
    try {
      const { data, error } = await this.supabase.from('chats').insert({ text });
      if (error) {
        alert(error.message);
      }
    } catch (error) {
      alert(error);
    }
  }

  async listChat() {
    try {
      const { data, error } = await this.supabase
        .from('chats')
        .select('*,users(*)');

      if (error) {
        alert(error.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteChat(id: string) {
    const data = await this.supabase.from('chats').delete().eq('id', id);
    return data;
  }

  selectedChats(msg: Ichat) {
    this.savedChat.set(msg);
  }
}