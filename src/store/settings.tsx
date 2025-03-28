import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { defineStore } from "pinia";
export const settingsStore = defineStore("settings", () => {
  const isDark = ref<boolean>(false);
  const getDark = computed(() => isDark);
  const setDark = (value: boolean) => {
    isDark.value = value;
  };
  const settings = ref<SettingsMenuValues>({
    general: {},
    function: {},
    aiSetting: {
      value: [
        {
          API_KEY: "",
          API_URL: "https://api.openai.com",
          MODELS: [],
          PROVIDES: "openai",
          DEFAULT_URL: "https://api.openai.com",
        },
        {
          API_KEY: "",
          API_URL: "https://generativelanguage.googleapis.com/v1beta/openai/",
          DEFAULT_URL:
            "https://generativelanguage.googleapis.com/v1beta/openai/",
          MODELS: [],
          PROVIDES: "gemini",
        },
      ],
      nowProvides: "openai",
    },
  });
  const modalSenderOptions = computed(() => {
    const result: SelectMixedOption[] = [];
    for (const provider of settings.value.aiSetting.value) {
      result.push({
        label: provider.PROVIDES,
        value: provider.PROVIDES,
        disabled: true,
      });

      for (const model of provider.MODELS) {
        result.push({
          label: model,
          value: model,
        });
      }
    }
    return result;
  });
  const getAllSettings = computed({
    get: () => settings.value,
    set: () => {
      throw new Error("Cannot set readonly property");
    },
  });
  const setSetting = <K extends SettingsFormKey>(
    key: K,
    field: keyof SettingsMenuValues[K],
    value: SettingsMenuValues[K][keyof SettingsMenuValues[K]]
  ) => {
    settings.value[key][field] = value;
  };
  const getSetting = <K extends SettingsFormKey>(
    key: K,
    field: keyof SettingsMenuValues[K]
  ) => {
    return settings.value[key][field];
  };
  const getNowProvidesSetting = () => {
    return settings.value.aiSetting.value.find(
      (item) => item.PROVIDES === settings.value.aiSetting.nowProvides
    );
  };
  return {
    isDark,
    settings,
    setDark,
    getDark,
    getAllSettings,
    setSetting,
    getSetting,
    getNowProvidesSetting,
    modalSenderOptions,
  };
});
