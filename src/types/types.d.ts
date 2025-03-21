import '@tauri-apps/plugin-os';
import { Size } from "naive-ui/es/form/src/interface";


import antdIcon from "@vicons/antd";
import materialIcon from '@vicons/material'
import carbonIcon from '@vicons/carbon'
import tablerIcon from '@vicons/tabler'
import { VNode } from 'vue';
declare global {
    interface AIFOptions {
        name: string
        command: string
        description: string
        params?: Record<string, any>
        windowLabel: 'main' | '设置'
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

    interface SettingsMenuValues {
        general: {},
        function: {},
        aiSetting: {
            API_KEY: string,
            API_URL: string
        }
    }

    type SettingsFormKey = keyof SettingsMenuValues
    interface FormSchema<K> {
        field: keyof SettingsMenuValues[K]
        component: 'input' | 'select'
        label: string
        placeholder: string
        defaultValue: string
        description: string
        options?: {
            label: string
            value: string
        }[]
        size?: Size
        feedbackRender?: () => VNode
    }
    interface FormProps {
        schemas: FormSchema[]
        title: string
        description: string
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