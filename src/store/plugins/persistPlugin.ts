import { PiniaPluginContext } from 'pinia';
import { db } from './indexedDB';

export interface PersistOptions {
  enabled: boolean;
  include?: string[];
  exclude?: string[];
}

const defaultOptions: PersistOptions = {
  enabled: true
};

// 序列化处理函数
function serialize(state: any): any {
  return JSON.parse(JSON.stringify(state));
}

export function createPersistPlugin(pluginOptions: Partial<PersistOptions> = {}) {
  const options = { ...defaultOptions, ...pluginOptions };

  return ({ store, options: storeOptions }: PiniaPluginContext) => {
    const persistOptions: PersistOptions = {
      ...options,
      ...((storeOptions as any).persist || {})
    };

    if (!persistOptions.enabled) {
      return;
    }

    const filterState = (state: any) => {
      const serializedState = serialize(state);

      if (persistOptions.include?.length) {
        return Object.fromEntries(
          Object.entries(serializedState).filter(([key]) =>
            persistOptions.include!.includes(key)
          )
        );
      }

      if (persistOptions.exclude?.length) {
        return Object.fromEntries(
          Object.entries(serializedState).filter(([key]) =>
            !persistOptions.exclude!.includes(key)
          )
        );
      }

      return serializedState;
    };

    const initializeStore = async () => {
      try {
        const savedState = await db.loadState(store.$id);

        if (savedState) {
          store.$patch(savedState);
        }
      } catch (error) {
        console.error(`Failed to load state for store "${store.$id}":`, error);
      }
    };

    store.$subscribe(async (_, state) => {
      try {
        const filteredState = filterState(state);
        await db.saveState(store.$id, filteredState);
      } catch (error) {
        console.error(`Failed to save state for store "${store.$id}":`, error);
      }
    }, { detached: true });
    initializeStore();
  };
}