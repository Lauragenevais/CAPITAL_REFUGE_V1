export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      adstrack_sends: {
        Row: {
          channel: string
          created_at: string
          email: string
          first_name: string
          id: string
          ip_address: string
          last_name: string
          ok: boolean
          operation: string
          phone: string
          request_url: string
          response_body: string
          response_status: number | null
          source: string
        }
        Insert: {
          channel?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          ip_address?: string
          last_name?: string
          ok?: boolean
          operation?: string
          phone?: string
          request_url?: string
          response_body?: string
          response_status?: number | null
          source?: string
        }
        Update: {
          channel?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          ip_address?: string
          last_name?: string
          ok?: boolean
          operation?: string
          phone?: string
          request_url?: string
          response_body?: string
          response_status?: number | null
          source?: string
        }
        Relationships: []
      }
      hlr_refusals: {
        Row: {
          channel: string
          click_id: string
          created_at: string
          email: string
          first_name: string
          hlr_network: string
          hlr_status: string
          id: string
          ip_address: string
          last_name: string
          operation: string
          phone: string
          source: string
        }
        Insert: {
          channel?: string
          click_id?: string
          created_at?: string
          email?: string
          first_name?: string
          hlr_network?: string
          hlr_status?: string
          id?: string
          ip_address?: string
          last_name?: string
          operation?: string
          phone?: string
          source?: string
        }
        Update: {
          channel?: string
          click_id?: string
          created_at?: string
          email?: string
          first_name?: string
          hlr_network?: string
          hlr_status?: string
          id?: string
          ip_address?: string
          last_name?: string
          operation?: string
          phone?: string
          source?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          click_id: string
          consent: boolean
          created_at: string
          email: string
          first_name: string
          hlr_network: string
          hlr_status: string
          id: string
          invest_amount: string
          ip_address: string
          last_name: string
          notes: string
          operation: string
          pays: string
          phone: string
          phone_verified: boolean
          sms_attempts: number
          sms_code_expires_at: string | null
          sms_code_hash: string | null
          sms_delivered_at: string | null
          sms_delivery_status: string
          sms_last_reason: string
          sms_sent_count: number
          source: string
          status: string
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          click_id?: string
          consent?: boolean
          created_at?: string
          email: string
          first_name: string
          hlr_network?: string
          hlr_status?: string
          id?: string
          invest_amount?: string
          ip_address?: string
          last_name: string
          notes?: string
          operation?: string
          pays?: string
          phone: string
          phone_verified?: boolean
          sms_attempts?: number
          sms_code_expires_at?: string | null
          sms_code_hash?: string | null
          sms_delivered_at?: string | null
          sms_delivery_status?: string
          sms_last_reason?: string
          sms_sent_count?: number
          source?: string
          status?: string
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          click_id?: string
          consent?: boolean
          created_at?: string
          email?: string
          first_name?: string
          hlr_network?: string
          hlr_status?: string
          id?: string
          invest_amount?: string
          ip_address?: string
          last_name?: string
          notes?: string
          operation?: string
          pays?: string
          phone?: string
          phone_verified?: boolean
          sms_attempts?: number
          sms_code_expires_at?: string | null
          sms_code_hash?: string | null
          sms_delivered_at?: string | null
          sms_delivery_status?: string
          sms_last_reason?: string
          sms_sent_count?: number
          source?: string
          status?: string
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
