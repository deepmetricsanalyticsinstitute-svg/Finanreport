import { Transaction } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

/**
 * Retrieves transactions from localStorage.
 * @returns An array of Transaction objects or an empty array if none found.
 */
export const getTransactionsFromLocalStorage = (): Transaction[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading transactions from localStorage:', error);
    return [];
  }
};

/**
 * Saves an array of transactions to localStorage.
 * @param transactions The array of Transaction objects to save.
 */
export const saveTransactionsToLocalStorage = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions to localStorage:', error);
  }
};