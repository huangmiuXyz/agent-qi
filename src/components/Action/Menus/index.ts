
import Setting from "../Settings/index.vue";
export const useMenus = () => {
    const { openModal } = useCustomModal();
    const topMenus = computed(() =>
        menus.filter((item) => item.position !== "bottom")
    );
    const bottomMenus = computed(() =>
        menus.filter((item) => item.position === "bottom")
    );

    const router = useRouter();
    const activeMenu = ref(1);
    const openSettingModal =
        AIF({
            command: "openSettingModal",
            description: "打开设置弹窗",
            name: '打开设置弹窗'
        },
            () =>
                openModal({
                    title: "设置",
                    style: {
                        width: "50vw",
                        minWidth: "500px",
                        height: "90vh",
                        overflow: "auto",
                        borderRadius: "10px",
                    },
                    width: 800,
                    height: 600,
                    content: () => h(Setting),
                    maskClosable: true,
                }));

    const menus: MenuList = [
        {
            key: 1,
            label: "小说",
            path: "/Sections",
            icon: "ReadOutlined",
            description: "切换到写小说页面，可以对小说进行编辑修改",
        },
        {
            key: 2,
            label: "设置",
            icon: "SettingOutlined",
            description: "切换到设置页面，可以对软件进行设置，修改各种参数",
            position: "bottom",
            onClick: openSettingModal,
        },
    ];

    const handleClick = AIF({
        command: "changeMenus",
        description: "切换菜单",
        paramsDescription: "参数",
        params: [{
            type: "number",
            description: `菜单的key只能从${JSON.stringify(menus)}中选择`
        }],
        name: '切换菜单'
    }, async (key: MenuItem["key"]) => {
        const item = menus.find((item) => item.key === key);
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
