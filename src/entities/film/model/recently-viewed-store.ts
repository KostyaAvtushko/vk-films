import { create } from 'zustand';
import { IFilm } from './models';

interface RecentlyViewedState {
  recentlyViewed: IFilm[];
  addRecentlyViewed: (film: IFilm) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>((set) => ({
  recentlyViewed: [],
  addRecentlyViewed: (film) => set((state) => ({ 
    recentlyViewed: [film, ...state.recentlyViewed].slice(0, 9), 
  })),
}));