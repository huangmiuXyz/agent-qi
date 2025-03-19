import '@tauri-apps/plugin-os';


import antdIcon from "@vicons/antd";
import materialIcon from '@vicons/material'
import carbonIcon from '@vicons/carbon'
import tablerIcon from '@vicons/tabler'
declare global {
    interface AIFOptions {
        name: string
        command: string
        description: string
        params?: Record<string, any>
    }
    type IconType =
        keyof typeof antdIcon
        | keyof typeof materialIcon
        | keyof typeof carbonIcon
        | keyof typeof tablerIcon
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


    type SettingsFormKey = 'general' | 'function'
    interface SettingsFormItem {

    }
    interface SettingsMenu {
        name: string;
        icon: IconType;
        key: SettingsFormKey;
        description: string
    }
    type SettingsMenuList = SettingsMenu[]
}

export { }