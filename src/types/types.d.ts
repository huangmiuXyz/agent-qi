import '@tauri-apps/plugin-os';


import antdIcon from "@vicons/antd";
import materialIcon from '@vicons/material'
import carbonIcon from '@vicons/carbon'
declare global {
    type IconType = keyof typeof antdIcon | keyof typeof materialIcon | keyof typeof carbonIcon
    interface MenuItem {
        key: number;
        label: string;
        icon: IconType | (() => IconType);
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