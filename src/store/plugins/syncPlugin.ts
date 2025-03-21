import { PiniaPluginContext } from 'pinia';
import { listen, emit } from '@tauri-apps/api/event';

const STORE_SYNC_EVENT = 'store-state-sync';

interface StoreSyncPayload {
    storeId: string;
    state: any;
}

export function createSyncPlugin() {
    return ({ store }: PiniaPluginContext) => {
        let isUpdatingFromSync = false;

        listen<StoreSyncPayload>(STORE_SYNC_EVENT, (event) => {
            const { storeId, state } = event.payload;
            if (storeId === store.$id) {
                const currentState = JSON.stringify(store.$state);
                const newState = JSON.stringify(state);
                if (currentState !== newState) {
                    isUpdatingFromSync = true;
                    store.$patch(state);
                    isUpdatingFromSync = false;
                }
            }
        });

        store.$subscribe((_, state) => {
            if (!isUpdatingFromSync) {
                emit(STORE_SYNC_EVENT, {
                    storeId: store.$id,
                    state: JSON.parse(JSON.stringify(state))
                });
            }
        });
    };
}