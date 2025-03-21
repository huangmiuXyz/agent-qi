import UIButton from "@/components/UI/Button/index.vue";
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
    },
    (key: SettingsFormKey) => {
      activeMenu.value = key;
    }
  );
  const getActiveMenu = computed(() => activeMenu);
  const Form = {
    function: [],
    general: [],
    aiSetting: [
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
          },
          {
            field: "model",
            component: "select",
            label: "模型选择",
            placeholder: "模型选择",
            defaultValue: "模型选择",
            description:
              "model是访问openai的请求模型,请选择一个模型,请求之前建议调用获取模型的接口从接口中选择模型的ID填入此处",
            size: "small",
            feedbackRender: () => (
              <UIButton fontSize="12px" text={true}>
                获取模型
              </UIButton>
            ),
          },
        ],
        title: "API 设置",
        description: "API设置",
      },
    ],
  } as const satisfies Record<SettingsFormKey, FormProps[]>;
  return {
    menus,
    handleClickMenu,
    getActiveMenu,
    Form,
  };
};
