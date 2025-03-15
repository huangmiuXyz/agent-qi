import Dexie from 'dexie';

interface StoreRecord {
  id: string;
  state: any;
}

export class AppDatabase extends Dexie {
  storeStates!: Dexie.Table<StoreRecord, string>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      storeStates: 'id, state'
    });
  }

  async saveState(storeId: string, state: any): Promise<void> {
    try {
      const record: StoreRecord = {
        id: storeId,
        state: state
      };

      await this.storeStates.put(record);
    } catch (error) {
      console.error(`Error saving state to IndexedDB:`, error);
      throw error;
    }
  }

  async loadState(storeId: string): Promise<any | null> {
    try {
      const record = await this.storeStates.get(storeId);
      return record?.state || null;
    } catch (error) {
      console.error(`Error loading state from IndexedDB:`, error);
      return null;
    }
  }

  async removeState(storeId: string): Promise<void> {
    try {
      await this.storeStates.delete(storeId);
    } catch (error) {
      console.error(`Error removing state from IndexedDB:`, error);
    }
  }

  async clearAllStates(): Promise<void> {
    try {
      await this.storeStates.clear();
    } catch (error) {
      console.error(`Error clearing all states from IndexedDB:`, error);
    }
  }
}

export const db = new AppDatabase();