import { SelectMixedOption } from "naive-ui/es/select/src/interface";
const activeMenu = ref<SettingsFormKey>("general");
export const useSettingsMenu = () => {
  const menus: SettingsMenuList = [
    {
      name: "通用设置",
      icon: "AdjustmentsHorizontal",
      key: "general",
      description: "通用设置",
    },
    {
      name: "函数设置",
      icon: "Function",
      key: "function",
      description: "函数设置",
    },
    {
      name: "AI 设置",
      icon: "ElectricalServicesRound",
      key: "aiSetting",
      description: "AI设置",
    },
  ];
  const handleClickMenu = AIF(
    {
      name: "切换设置项目",
      description: "切换设置项目，在设置页面切换设置的选项",
      params: [
        {
          type: "number",
          description: `菜单的key只能从${JSON.stringify(
            menus.map((item) => ({
              key: item.key,
              description: item.description,
            }))
          )}中选择`,
        },
      ],
      command: "switch-settings-menu",
      windowLabel: "设置",
      category: "local-function",
    },
    (key: SettingsFormKey) => {
      activeMenu.value = key;
    }
  );
  const getActiveMenu = computed(() => activeMenu);
  const models = ref<SelectMixedOption[]>([]);
  const modelSelectLoading = ref(false);
  const { settings } = settingsStore();
  const getForm = computed(
    () =>
      ({
        function: [],
        general: [],
        aiSetting: [
          {
            title: "API 设置",
            description: "API设置",
            schemas: [
              {
                field: "nowProvides",
                component: "select",
                label: "供应商",
                placeholder: "供应商",
                defaultValue: "openai",
                description: "供应商",
                size: "small",
                showFeedback: false,
                tag: true,
                filterable: true,
                onChange: (value: string) => {
                  if (
                    settings.aiSetting.value.find(
                      (item) => item.PROVIDES === value
                    )
                  ) {
                    return;
                  }
                  settings.aiSetting.value.push({
                    PROVIDES: value,
                    API_URL: "",
                    API_KEY: "",
                    MODELS: [],
                  });
                },
                options: settings.aiSetting.value.map((item) => ({
                  label: item.PROVIDES,
                  value: item.PROVIDES,
                })),
              },
            ],
          },
          {
            schemas: [
              {
                field: "API_URL",
                component: "input",
                label: "API 地址",
                placeholder: "API 地址",
                defaultValue: "",
                description: "API_URL是openai的请求地址",
                size: "small",
              },
              {
                field: "API_KEY",
                component: "input",
                label: "API 密钥",
                placeholder: "API 密钥",
                defaultValue: "",
                description: "API_KEY是访问openai的请求凭证",
                size: "small",
                type: "password",
              },
              {
                field: "MODELS",
                component: "select",
                label: "模型选择",
                placeholder: "模型选择",
                defaultValue: "模型选择",
                description:
                  "MODELS是访问openai的请求模型,请选择一个模型,请求之前建议调用获取模型的接口从接口中选择模型的ID填入此处(此处为多选类型为：[{label: '模型ID', value: '模型ID'}])",
                size: "small",
                loading: modelSelectLoading.value,
                options: models.value,
                multiple: true,
                tag: true,
                filterable: true,
                showFeedback: false,
                onFocus: async () => {
                  modelSelectLoading.value = true;
                  try {
                    const { data } = await openAiService().getModel();
                    models.value = data.map((e) => ({
                      label: e.id,
                      value: e.id,
                    }));
                  } catch (error) {
                    console.error(error);
                  } finally {
                    modelSelectLoading.value = false;
                  }
                },
              },
            ],
          },
        ],
      }) as Record<SettingsFormKey, FormProps[]>
  );
  return {
    menus,
    handleClickMenu,
    getActiveMenu,
    getForm,
  };
};
