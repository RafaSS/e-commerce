import { defineStore } from 'pinia';
import { supabaseClient } from '~/server/utils/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),
  
  getters: {
    isAuthenticated(): boolean {
      return !!this.user;
    }
  },
  
  actions: {
    async fetchUser() {
      try {
        this.loading = true;
        const { data, error } = await supabaseClient.auth.getUser();
        
        if (error) {
          throw error;
        }
        
        this.user = data.user;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error fetching user:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async signIn(email: string, password: string) {
      try {
        this.loading = true;
        this.error = null;
        
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          throw error;
        }
        
        this.user = data.user;
        return data;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error during sign in:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async signUp(email: string, password: string) {
      try {
        this.loading = true;
        this.error = null;
        
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password,
        });
        
        if (error) {
          throw error;
        }
        
        return data;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error during sign up:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async signOut() {
      try {
        this.loading = true;
        
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) {
          throw error;
        }
        
        this.user = null;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error during sign out:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
