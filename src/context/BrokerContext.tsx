import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Broker {
  id: number;
  name: string;
  role: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
}

interface BrokerContextType {
  brokers: Broker[];
  addBroker: (broker: Omit<Broker, 'id'>) => void;
  removeBroker: (id: number) => void;
  updateBroker: (id: number, broker: Partial<Broker>) => void;
}

const BrokerContext = createContext<BrokerContextType | undefined>(undefined);

const INITIAL_BROKERS: Broker[] = [
  {
    id: 1,
    name: 'Simone Fagundes',
    role: 'Corretora Sênior',
    photo: 'https://i.imgur.com/2vUJ9Au.png',
    phone: '(32) 99999-9999',
    email: 'simone@crimoveis.com.br',
    bio: 'Especialista em imóveis de alto padrão com mais de 10 anos de experiência.'
  },
  {
    id: 2,
    name: 'Daniel',
    role: 'CEO & Corretor',
    photo: 'https://i.imgur.com/2vUJ9Au.png',
    phone: '(32) 88888-8888',
    email: 'daniel@crimoveis.com.br',
    bio: 'Fundador da CR Imóveis, focado em inovação e atendimento personalizado.'
  }
];

export function BrokerProvider({ children }: { children: React.ReactNode }) {
  const [brokers, setBrokers] = useState<Broker[]>(() => {
    const saved = localStorage.getItem('assis_brokers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing brokers from localStorage', e);
        return INITIAL_BROKERS;
      }
    }
    return INITIAL_BROKERS;
  });

  useEffect(() => {
    localStorage.setItem('assis_brokers', JSON.stringify(brokers));
  }, [brokers]);

  const addBroker = (newBroker: Omit<Broker, 'id'>) => {
    const id = brokers.length > 0 ? Math.max(...brokers.map(b => b.id)) + 1 : 1;
    setBrokers(prev => [...prev, { ...newBroker, id }]);
  };

  const removeBroker = (id: number) => {
    setBrokers(prev => prev.filter(b => b.id !== id));
  };

  const updateBroker = (id: number, updatedFields: Partial<Broker>) => {
    setBrokers(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
  };

  return (
    <BrokerContext.Provider value={{ brokers, addBroker, removeBroker, updateBroker }}>
      {children}
    </BrokerContext.Provider>
  );
}

export function useBrokers() {
  const context = useContext(BrokerContext);
  if (context === undefined) {
    throw new Error('useBrokers must be used within a BrokerProvider');
  }
  return context;
}
