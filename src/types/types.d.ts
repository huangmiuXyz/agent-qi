
declare global {
    type IconType = string
    interface MenuItem {
        key: number;
        label: string;
        icon: IconType;
        path?: string;
        position?: "bottom"
        onClick?: () => void;
    }

    type MenuList = MenuItem[]
}

export { }