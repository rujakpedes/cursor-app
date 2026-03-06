import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { StoreSettings, Product, PromoItem, DeliveryOption } from '../data/types';
import { api } from '../services/api';

interface StoreState {
  settings: StoreSettings | null;
  products: Product[];
  promos: PromoItem[];
  deliveryOptions: DeliveryOption[];
  loading: boolean;
  maintenance: boolean;
  maintenanceMessage: string;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [promos, setPromos] = useState<PromoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<StoreSettings>('/store/settings').catch(() => null),
      api.get<Product[]>('/products').catch(() => []),
      api.get<PromoItem[]>('/promos/active').catch(() => []),
    ]).then(([s, p, pr]) => {
      if (s) setSettings(s);
      setProducts(p as Product[]);
      setPromos(pr as PromoItem[]);
      setLoading(false);
    });
  }, []);

  const deliveryOptions: DeliveryOption[] = settings
    ? [
        {
          id: 'PRIORITY',
          label: 'Priority',
          time: `< ${settings.deliveryTimePriority} mins`,
          fee: settings.deliveryFeePriority,
          originalFee: settings.deliveryFeePriority + 10000,
          description: 'Get a voucher if your order arrives late.',
          isRecommended: true,
        },
        {
          id: 'STANDARD',
          label: 'Standard',
          time: `${settings.deliveryTimeStandard} mins`,
          fee: settings.deliveryFeeStandard,
          originalFee: settings.deliveryFeeStandard + 10000,
        },
        {
          id: 'SAVER',
          label: 'Saver',
          time: `${settings.deliveryTimeSaver} mins`,
          fee: settings.deliveryFeeSaver,
          originalFee: settings.deliveryFeeSaver + 10000,
        },
      ]
    : [];

  const maintenance = settings?.maintenanceMode ?? false;
  const maintenanceMessage = settings?.maintenanceMessage ?? '';

  return (
    <StoreContext.Provider value={{ settings, products, promos, deliveryOptions, loading, maintenance, maintenanceMessage }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be within StoreProvider');
  return ctx;
}
