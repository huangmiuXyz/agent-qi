import * as Icons from '@ant-design/icons-vue'

declare global {
    type IconType = Exclude<
        keyof typeof Icons,
        "createFromIconfontCN" | "getTwoToneColor" | "setTwoToneColor" | "default"
    >;
    interface MenuItem {
        key: number;
        label: string;
        icon: IconType;
        path?: string;
        position?: "bottom"
    }

    type MenuList = MenuItem[]
}

export { }