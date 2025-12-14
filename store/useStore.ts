import { create } from 'zustand';
import { ProductData, AppView, ResultTab } from '../types';

interface StoreState {
  view: AppView;
  activeTab: ResultTab;
  productData: ProductData | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  
  setView: (view: AppView) => void;
  setActiveTab: (tab: ResultTab) => void;
  setProductData: (data: ProductData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  view: 'HOME',
  activeTab: 'OVERVIEW',
  productData: null,
  isLoading: false,
  error: null,
  searchQuery: '',

  setView: (view) => set({ view }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setProductData: (data) => set({ productData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  reset: () => set({
    view: 'HOME',
    activeTab: 'OVERVIEW',
    productData: null,
    isLoading: false,
    error: null,
    searchQuery: ''
  })
}));
