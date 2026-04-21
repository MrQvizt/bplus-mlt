export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      providers: {
        Row: {
          id: string;
          name: string;
          logo_url: string;
          description: string;
          phone: string | null;
          instagram: string | null;
          areas: string[];
          locations: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['providers']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['providers']['Insert']>;
      };
      offers: {
        Row: {
          id: string;
          provider_id: string;
          title: string;
          description: string;
          category: 'Food' | 'Fitness' | 'Beauty' | 'Activities' | 'Shopping';
          terms: string[];
          area: string;
          address: string;
          expiry_date: string;
          is_active: boolean;
          base_code: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['offers']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['offers']['Insert']>;
      };
      promoted_offers: {
        Row: {
          id: string;
          provider_id: string;
          offer_id: string;
          headline: string;
          discount: string;
          bg_gradient: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['promoted_offers']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['promoted_offers']['Insert']>;
      };
    };
  };
}
