
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
    const openSettingModal = () =>
        openModal({
            title: "设置",
            style: {
                width: "80vw",
                height: "90vh",
                overflow: "auto",
                borderRadius: "10px",
            },
            width: 800,
            height: 600,
            content: () => h(Setting),
            maskClosable: true,
        });

    const menus: MenuList = [
        {
            key: 1,
            label: "小说",
            path: "/Sections",
            icon: "ReadOutlined",
        },
        {
            key: 2,
            label: "设置",
            icon: "SettingOutlined",
            position: "bottom",
            onClick: openSettingModal,
        },
    ];

    const handleClick = async (item: MenuItem) => {
        if (!item.path) {
            item.onClick?.();
            return;
        }
        activeMenu.value = item.key;
        router.push(item.path);
    };
    return {
        handleClick,
        bottomMenus,
        topMenus,
        activeMenu,
    };
};
