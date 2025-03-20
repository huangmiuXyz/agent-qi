
const activeMenu = ref<SettingsFormKey>('general');
export const useSettingsMenu = () => {
    const menus: SettingsMenuList = [
        {
            name: "通用设置",
            icon: "AdjustmentsHorizontal",
            key: 'general',
            description: "通用设置",
        },
        {
            name: "函数设置",
            icon: "Function",
            key: 'function',
            description: "函数设置",
        },
        {
            name: "AI设置",
            icon: "ElectricalServicesRound",
            key: 'aiSetting',
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
            windowLabel: '设置'
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
                schemas: [{
                    field: "API_KEY",
                    type: "input",
                    label: "API凭证",
                    placeholder: "请输入API_KEY",
                    required: true,
                    defaultValue: "",
                    description: "API_KEY是AI的访问凭证",
                },
                {
                    field: "API_URL",
                    type: "input",
                    label: "API地址",
                    placeholder: "请输入API_URL",
                    required: true,
                    defaultValue: "",
                    description: "API_URL是AI的访问地址",
                }],
                title: "API设置",
                description: "API设置",
            },
        ]
    } as const satisfies Record<SettingsFormKey, FormProps[]>;;
    return {
        menus,
        handleClickMenu,
        getActiveMenu,
        Form
    };
};
