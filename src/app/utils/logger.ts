'use client';

import { v4 as uuidv4 } from 'uuid';
import { LogEntry, LogDetails } from '../types/logging';

// Log interaction events
export const logInteraction = async (event: string, details: LogDetails): Promise<void> => {
  try {
    const logEntry: LogEntry = {
      event,
      details,
      timestamp: new Date().toISOString(),
      session_id: uuidv4(),
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL}/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('Interaction logged:', logEntry);
    }
  } catch (error) {
    console.error('Failed to log interaction:', error);
  }
};

// Log errors
export const logError = (error: Error, message: string): void => {
  try {
    const logEntry: LogEntry = {
      event: 'error',
      details: { message, error: error.message, stack: error.stack },
      timestamp: new Date().toISOString(),
      session_id: uuidv4(),
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
    };

    // Use async fetch but don't await in a void function to avoid blocking
    fetch(`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL}/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry),
    }).then((response) => {
      if (!response.ok) {
        console.error(`Failed to log error: HTTP status ${response.status}`);
      } else if (process.env.NODE_ENV !== 'production') {
        console.log('Error logged:', logEntry);
      }
    }).catch((err) => {
      console.error('Failed to log error:', err);
    });
  } catch (error) {
    console.error('Failed to log error:', error);
  }
};