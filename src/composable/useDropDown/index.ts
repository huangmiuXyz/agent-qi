import { DropdownMixedOption } from "naive-ui/es/dropdown/src/interface"

const showDropdownRef = ref(false)
const position = ref({
    x: 0,
    y: 0
})
const dropDownOptions = ref<DropdownMixedOption[]>([])
export const useDropDown = (options?: []) => {
    if (options) {
        dropDownOptions.value = options
    }
    const showDropdown = (e: MouseEvent) => {
        showDropdownRef.value = true
        position.value = {
            x: e.clientX,
            y: e.clientY
        }
    }
    const onClickoutside = () => {
        showDropdownRef.value = false
    }
    const handleSelect = (key: string | number) => {
        showDropdownRef.value = false
    }
    return {
        showDropdownRef,
        onClickoutside,
        handleSelect,
        position,
        dropDownOptions,
        showDropdown
    }
}