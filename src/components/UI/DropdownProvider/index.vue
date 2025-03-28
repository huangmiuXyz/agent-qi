<template>
    <n-dropdown placement="bottom-start" trigger="manual" :x="position.x" :y="position.y" :options="dropDownOptions"
        :show="showDropdown" :on-clickoutside="onClickoutside" @select="handleSelect" />
</template>
<script setup lang="ts">
const { showDropdown, dropDownOptions, position } = toRefs(useDropDown())
const { handleSelect, onClickoutside } = useDropDown()
</script>