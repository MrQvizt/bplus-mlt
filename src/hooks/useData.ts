import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Provider, Offer, PromotedOffer } from '@/data/mockData';

// ── Row mappers ──────────────────────────────────────────────

function mapProvider(row: Record<string, unknown>): Provider {
  return {
    id: row.id as string,
    name: row.name as string,
    logoUrl: row.logo_url as string,
    description: row.description as string,
    phone: (row.phone as string | null) ?? undefined,
    instagram: (row.instagram as string | null) ?? undefined,
    areas: row.areas as string[],
    locations: row.locations as string[],
  };
}

function mapOffer(row: Record<string, unknown>): Offer {
  return {
    id: row.id as string,
    providerId: row.provider_id as string,
    title: row.title as string,
    description: row.description as string,
    category: row.category as Offer['category'],
    terms: row.terms as string[],
    area: row.area as string,
    address: row.address as string,
    expiryDate: row.expiry_date as string,
    isActive: row.is_active as boolean,
    baseCode: row.base_code as string,
  };
}

// ── Hooks ────────────────────────────────────────────────────

export function useProviders() {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('name');
      if (error) throw error;
      return (data as Record<string, unknown>[]).map(mapProvider);
    },
  });
}

export function useProvider(id: string | undefined) {
  return useQuery({
    queryKey: ['providers', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('id', id!)
        .single();
      if (error) throw error;
      return mapProvider(data as Record<string, unknown>);
    },
  });
}

/** Returns all active offers, each including its nested provider object. */
export function useOffersWithProvider() {
  return useQuery({
    queryKey: ['offers', 'with-provider'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*, providers(*)')
        .eq('is_active', true);
      if (error) throw error;
      return (data as Record<string, unknown>[]).map((row) => ({
        offer: mapOffer(row),
        provider: mapProvider(row.providers as Record<string, unknown>),
      }));
    },
  });
}

export function useOffer(id: string | undefined) {
  return useQuery({
    queryKey: ['offers', id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('id', id!)
        .single();
      if (error) throw error;
      return mapOffer(data as Record<string, unknown>);
    },
  });
}

export function useOffersByProvider(providerId: string | undefined) {
  return useQuery({
    queryKey: ['offers', 'by-provider', providerId],
    enabled: !!providerId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('provider_id', providerId!)
        .eq('is_active', true);
      if (error) throw error;
      return (data as Record<string, unknown>[]).map(mapOffer);
    },
  });
}

export function usePromotedOffers() {
  return useQuery({
    queryKey: ['promoted-offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('promoted_offers')
        .select('*, providers(*)')
        .order('sort_order');
      if (error) throw error;
      return (data as Record<string, unknown>[]).map((row) => ({
        promo: {
          id: row.id,
          providerId: row.provider_id,
          offerId: row.offer_id,
          headline: row.headline,
          discount: row.discount,
          bgGradient: row.bg_gradient,
        } as PromotedOffer,
        provider: mapProvider(row.providers as Record<string, unknown>),
      }));
    },
  });
}
