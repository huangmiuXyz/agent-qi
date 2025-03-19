import { createPersistPlugin } from './persistPlugin';
import { createSyncPlugin } from './syncPlugin';

export const persistPlugin = createPersistPlugin();
export const syncPlugin = createSyncPlugin();
