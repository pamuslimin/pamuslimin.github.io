export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          bankname: string | null
          banknumber: string | null
          holdername: string | null
          id: string
        }
        Insert: {
          bankname?: string | null
          banknumber?: string | null
          holdername?: string | null
          id?: string
        }
        Update: {
          bankname?: string | null
          banknumber?: string | null
          holdername?: string | null
          id?: string
        }
      }
      blogs: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          content: string
          created_at: string
          id: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
        }
      }
      donations: {
        Row: {
          amount: number
          date: string | null
          donorName: string
          id: string
          optional_notes: string | null
        }
        Insert: {
          amount: number
          date?: string | null
          donorName: string
          id?: string
          optional_notes?: string | null
        }
        Update: {
          amount?: number
          date?: string | null
          donorName?: string
          id?: string
          optional_notes?: string | null
        }
      }
      expenses: {
        Row: {
          amount: number
          date: string | null
          description: string
          id: string
        }
        Insert: {
          amount: number
          date?: string | null
          description: string
          id?: string
        }
        Update: {
          amount?: number
          date?: string | null
          description?: string
          id?: string
        }
      }
      messages: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          replied: boolean
          reply: string | null
          sender_name: string | null
          sender_phone: number | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          replied?: boolean
          reply?: string | null
          sender_name?: string | null
          sender_phone?: number | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          replied?: boolean
          reply?: string | null
          sender_name?: string | null
          sender_phone?: number | null
          subject?: string | null
        }
      }
      orphanage_info: {
        Row: {
          abouttext: string | null
          address: string | null
          email: string | null
          id: string
          name: string
          optional_notes: string | null
          phone: string | null
        }
        Insert: {
          abouttext?: string | null
          address?: string | null
          email?: string | null
          id: string
          name: string
          optional_notes?: string | null
          phone?: string | null
        }
        Update: {
          abouttext?: string | null
          address?: string | null
          email?: string | null
          id?: string
          name?: string
          optional_notes?: string | null
          phone?: string | null
        }
      }
      orphans: {
        Row: {
          additional_info: string | null
          avatar_url: string | null
          birthdate: string | null
          birthplace: string | null
          full_name: string
          gender: boolean | null
          id: string
          medical_history: string | null
          status: string | null
        }
        Insert: {
          additional_info?: string | null
          avatar_url?: string | null
          birthdate?: string | null
          birthplace?: string | null
          full_name?: string
          gender?: boolean | null
          id?: string
          medical_history?: string | null
          status?: string | null
        }
        Update: {
          additional_info?: string | null
          avatar_url?: string | null
          birthdate?: string | null
          birthplace?: string | null
          full_name?: string
          gender?: boolean | null
          id?: string
          medical_history?: string | null
          status?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          status: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
      }
      settings: {
        Row: {
          id: string | null
          properties: string | null
          value: string | null
        }
        Insert: {
          id?: string | null
          properties?: string | null
          value?: string | null
        }
        Update: {
          id?: string | null
          properties?: string | null
          value?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
