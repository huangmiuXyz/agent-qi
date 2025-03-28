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
    const onClickoutside = () => {
        showDropdownRef.value = false
    }
    const handleSelect = (key: string | number) => {
        showDropdownRef.value = false
    }
    return {
        showDropdown: showDropdownRef,
        onClickoutside,
        handleSelect,
        position,
        dropDownOptions
    }
}