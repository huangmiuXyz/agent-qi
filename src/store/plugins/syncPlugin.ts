import { PiniaPluginContext } from 'pinia';
import { listen, emit } from '@tauri-apps/api/event';

const STORE_SYNC_EVENT = 'store-state-sync';

interface StoreSyncPayload {
    storeId: string;
    state: any;
}

export function createSyncPlugin() {
    return ({ store }: PiniaPluginContext) => {
        listen<StoreSyncPayload>(STORE_SYNC_EVENT, (event) => {
            const { storeId, state } = event.payload;
            if (storeId === store.$id) {
                const currentState = JSON.stringify(store.$state);
                const newState = JSON.stringify(state);

                if (currentState !== newState) {
                    store.$patch(state);
                }
            }
        });
        store.$subscribe((_, state) => {
            emit(STORE_SYNC_EVENT, {
                storeId: store.$id,
                state: JSON.parse(JSON.stringify(state))
            });
        });
    };
} 