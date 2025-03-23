import '@tauri-apps/plugin-os';
import { Size } from "naive-ui/es/form/src/interface";
import OpenAI from "openai";

import antdIcon from "@vicons/antd";
import materialIcon from '@vicons/material'
import carbonIcon from '@vicons/carbon'
import tablerIcon from '@vicons/tabler'
import { VNode } from 'vue';
const listModels = new OpenAI.Models().list
declare global {
    interface AIFOptions {
        name: string
        command: string
        description: string
        params?: {
            type: string,
            description: string,
            required: boolean
        }[]
        windowLabel: 'main' | '设置'
        type: 'remote-api' | 'local-function',
        category: 'document' | 'setting'
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
    // 
    type PROVIDES = 'openai' | string
    interface SettingsMenuValues {
        general: {},
        function: {},
        aiSetting: {
            value: [{
                API_KEY: string,
                API_URL: string,
                MODELS: string[]
                PROVIDES: PROVIDES
            }],
            nowProvides: PROVIDES
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
        onFocus?: (e: FocusEvent) => void
        loading?: boolean
        multiple?: boolean
        filterable?: boolean
        tag?: boolean
        type?: "textarea" | "text" | "password";
        showFeedback?: boolean
        onUpdate?: (value: string) => void
    }
    interface FormProps {
        schemas: FormSchema[]
        title: string
        description: string
        name?: keyof SettingsMenuValues
    }
    interface SettingsMenu {
        name: string;
        icon: IconType;
        key: SettingsFormKey;
        description: string
    }
    type SettingsMenuList = SettingsMenu[]
    //openai
    type Models = OpenAI.Models.Model[]
    type getModelsResponse = ReturnType<typeof listModels>
    // document
    type SectionId = string
    interface Section {
        id: SectionId
        create: Date
        update: Date
        title: string
        content: string
    }
    type DocumentId = string | number
    interface Documents {
        id: DocumentId
        create?: Date
        update?: Date
        sections: Section[]
        title: string
    }
}

export { }