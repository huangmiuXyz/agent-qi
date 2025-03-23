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
          API_URL: "",
          MODELS: [],
          PROVIDES: "openai",
        },
      ],
      nowProvides: "openai",
    },
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
  return {
    isDark,
    settings,
    setDark,
    getDark,
    getAllSettings,
    setSetting,
    getSetting,
  };
});
