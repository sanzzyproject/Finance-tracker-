import { openDB, DBSchema } from 'idb';
import { Transaction } from '@/types/finance';

interface FinanceDB extends DBSchema {
  transactions: {
    key: number;
    value: Transaction;
    indexes: { 'by-date': string };
  };
}

const DB_NAME = 'finance-tracker-2026';

export const initDB = async () => {
  return openDB<FinanceDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('transactions')) {
        const store = db.createObjectStore('transactions', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('by-date', 'date');
      }
    },
  });
};

export const addTransaction = async (tx: Transaction) => {
  const db = await initDB();
  return db.add('transactions', tx);
};

export const getTransactions = async () => {
  const db = await initDB();
  return db.getAllFromIndex('transactions', 'by-date');
};

export const deleteTransaction = async (id: number) => {
  const db = await initDB();
  return db.delete('transactions', id);
};

export const updateTransaction = async (tx: Transaction) => {
  const db = await initDB();
  return db.put('transactions', tx);
};
