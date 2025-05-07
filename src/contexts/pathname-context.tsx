'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, useContext } from 'react';
import type { Children } from '@/types/children';

interface PathnameContextValue {
  pathname: string;
  searchParams?: URLSearchParams;
  fullUrl: string;
  isMission: boolean;
}

const PathnameContext = createContext<PathnameContextValue | null>(null);

export const PathnameProvider = ({ children }: Children) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fullUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
  const isMission = fullUrl.includes('mission_id');

  const value: PathnameContextValue = {
    pathname,
    fullUrl,
    isMission
  };

  return <PathnameContext.Provider value={value}>{children}</PathnameContext.Provider>;
};

export const usePathnameContext = (): PathnameContextValue => {
  const context = useContext(PathnameContext);
  if (context === null) {
    throw new Error('usePathnameContext must be used within a PathnameProvider');
  }
  return context;
};
