
import antdIcon from "@vicons/antd";
declare global {
    type IconType = keyof typeof antdIcon
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