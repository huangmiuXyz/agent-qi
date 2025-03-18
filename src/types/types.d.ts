import '@tauri-apps/plugin-os';


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
        description: string
    }
    type Window = {
        __TAURI_OS_PLUGIN_INTERNALS__: {
            platform: string;
            family: string;
            version: string;
            arch: string;
            exe_extension: string;
            os_type: string;
        }
    }

    type MenuList = MenuItem[]
}

export { }