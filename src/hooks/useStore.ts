import { Store } from '@tauri-apps/plugin-store';

export const useStore = async () => {
    const store = await Store.load('.messages.dat');
    return {
        get: async <T>(key: string): Promise<T | null> => {
            const value = await store.get<T>(key);
            return value ?? null;
        },
        set: async <T>(key: string, value: T): Promise<T> => {
            await store.set(key, value);
            await store.save();
            return value;
        },
        delete: async (key: string): Promise<void> => {
            await store.delete(key);
            await store.save();
        },
        clear: async (): Promise<void> => {
            await store.clear();
            await store.save();
        }
    };
};