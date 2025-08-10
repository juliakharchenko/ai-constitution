'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { logInteraction, logError } from '@/app/utils/logger';
import { LogDetails } from '@/app/types/logging';

// Define the shape of the logging context
interface LoggingContextType {
  logInteraction: (event: string, details: LogDetails) => Promise<void>;
  logError: (error: Error, message: string) => void;
}

// Create the LoggingContext with a default value
const LoggingContext = createContext<LoggingContextType>({
  logInteraction: async () => {},
  logError: () => {},
});

// LoggingProvider component to wrap the app or components
export const LoggingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LoggingContext.Provider value={{ logInteraction, logError }}>
      {children}
    </LoggingContext.Provider>
  );
};

// Custom hook to access logging functions
export const useLogging = (): LoggingContextType => {
  const context = useContext(LoggingContext);
  if (!context) {
    throw new Error('useLogging must be used within a LoggingProvider');
  }
  return context;
};