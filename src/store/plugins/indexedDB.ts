import Dexie from 'dexie';

interface StoreRecord {
  id: string;
  state: any;
}

// 定义数据库类
export class AppDatabase extends Dexie {
  // 定义存储表
  storeStates!: Dexie.Table<StoreRecord, string>;

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      storeStates: 'id, state'
    });
  }

  // 保存状态
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

  // 加载状态
  async loadState(storeId: string): Promise<any | null> {
    try {
      const record = await this.storeStates.get(storeId);
      return record?.state || null;
    } catch (error) {
      console.error(`Error loading state from IndexedDB:`, error);
      return null;
    }
  }

  // 删除状态
  async removeState(storeId: string): Promise<void> {
    try {
      await this.storeStates.delete(storeId);
    } catch (error) {
      console.error(`Error removing state from IndexedDB:`, error);
    }
  }

  // 清除所有状态
  async clearAllStates(): Promise<void> {
    try {
      await this.storeStates.clear();
    } catch (error) {
      console.error(`Error clearing all states from IndexedDB:`, error);
    }
  }
}

// 创建数据库实例
export const db = new AppDatabase();