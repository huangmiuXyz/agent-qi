import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';
import vueHook from 'alova/vue';
import { createApis, withConfigType } from './createApis';

export const alovaInstance = createAlova({
  statesHook: vueHook,
  requestAdapter: fetchAdapter(),
  responded: res => {
    return res.json();
  },
  beforeRequest: method => {
    if (!method.baseURL) {
      method.url = settingsStore(piniaInstance).getSetting('aiSetting', 'API_URL') + method.url
    }
  }
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

export default Apis;
