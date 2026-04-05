import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTIES as initialData } from '../constants/properties';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  parking: number;
  area: string;
  image: string;
  images?: string[];
  videoUrl?: string;
  pdfUrl?: string;
  category: string;
  categorySlug: string;
  status?: string;
  description?: string;
  broker?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerAddress?: string;
  additionalInfo?: string;
  rooms?: number;
  motoParking?: number;
  hasGourmetBalcony?: boolean;
  elevators?: number;
  hasLavabo?: boolean;
  hasHeatedPool?: boolean;
  hasSauna?: boolean;
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  removeProperty: (id: number) => void;
  updateProperty: (id: number, property: Partial<Property>) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('assis_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing properties from localStorage', e);
        return initialData;
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('assis_properties', JSON.stringify(properties));
  }, [properties]);

  const addProperty = (newProp: Omit<Property, 'id'>) => {
    const id = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    setProperties(prev => [{ ...newProp, id }, ...prev]);
  };

  const removeProperty = (id: number) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const updateProperty = (id: number, updatedFields: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, removeProperty, updateProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
