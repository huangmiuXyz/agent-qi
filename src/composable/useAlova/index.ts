import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

export const alovaInstance = createAlova({
    requestAdapter: adapterFetch(),
    responded: response => response.json(),
});