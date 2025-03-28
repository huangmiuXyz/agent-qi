import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import vueHook from 'alova/vue';
import { createApis, withConfigType } from './createApis';

export const alovaInstance = createAlova({
  statesHook: vueHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: method => {
    if (!method.baseURL) {
      method.url =
        settingsStore(piniaInstance).getNowProvidesSetting()?.API_URL +
        method.url;
      method.config.headers.Authorization = `Bearer ${settingsStore(piniaInstance).getNowProvidesSetting()?.API_KEY}`;
    }
  },
  responded: res => {
    return res.json();
  }
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

export default Apis;
