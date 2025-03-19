
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
        },
        (key: SettingsFormKey) => {
            activeMenu.value = key;
        }
    );
    const getActiveMenu = computed(() => activeMenu);
    return {
        menus,
        handleClickMenu,
        getActiveMenu,
    };
};
