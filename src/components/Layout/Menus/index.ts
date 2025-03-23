import Setting from "~/Settings/index.vue"
export const useMenus = () => {
    const { getDark, setDark } = settingsStore()
    const { openModal } = useCustomModal();
    const topMenus = computed(() =>
        menus.value.filter((item) => item.position !== "bottom")
    );
    const bottomMenus = computed(() =>
        menus.value.filter((item) => item.position === "bottom")
    );
    const router = useRouter();
    const activeMenu = ref(1);
    const openSettingModal =
        AIF({
            command: "openSettingModal",
            description: "打开设置弹窗",
            name: '打开设置弹窗',
            windowLabel: 'main',
            type: 'local-function',
            category: 'setting'
        },
            () => {
                openModal({
                    title: "设置",
                    style: {
                        width: "50vw",
                        minWidth: "500px",
                        height: "90vh",
                        overflow: "auto",
                        borderRadius: "10px",
                    },
                    hiddenTitle: true,
                    width: 800,
                    height: 600,
                    content: () => h(Setting),
                    maskClosable: true,
                    url: '/settings',
                })
            });
    const menus: ComputedRef<MenuList> = computed(() => [
        {
            key: 1,
            label: "小说",
            path: "/document",
            icon: "ReadOutlined",
            description: "切换到写小说页面，可以对小说进行编辑修改",
        },
        {
            key: 2,
            label: "黑暗模式",
            icon: getDark.value ? "WbSunnyOutlined" : "Moon",
            description: "切换黑暗模式",
            position: "bottom",
            onClick: () => {
                setDark(!getDark.value)
            },
        },
        {
            key: 3,
            label: "设置",
            icon: "SettingOutlined",
            description: "打开设置弹窗，可以对软件进行设置，修改各种参数",
            position: "bottom",
            onClick: openSettingModal,
        },
    ]);

    const handleClick = AIF({
        command: "changeMenus",
        description: "切换菜单",
        windowLabel: 'main',
        params: [{
            type: "number",
            description: `菜单的key只能从${JSON.stringify(menus.value.map(item => ({
                key: item.key, description: item.description
            })))}中选择`,
            required: true
        }],
        name: '切换菜单',
        type: 'local-function',
        category: 'setting'
    }, async (key: MenuItem["key"]) => {
        const item = menus.value.find((item) => item.key === key);
        if (!item) {
            return;
        }
        if (!item.path) {
            item.onClick?.();
            return;
        }
        activeMenu.value = item.key;
        router.push(item.path);
    });
    return {
        handleClick,
        bottomMenus,
        topMenus,
        activeMenu,
    };
};
