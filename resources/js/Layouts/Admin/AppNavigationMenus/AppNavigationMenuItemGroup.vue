<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { onMounted } from 'vue'

import { ref } from 'vue';
import { VIcon } from 'vuetify/lib/components/index.mjs';
import AppNavigationMenuLeaf from './AppNavigationMenuLeaf.vue';

const isOpen = ref(false)
const isInitialOpen = (items) => {

    for (var item of items) {


        if (item.href && route().current(item.href)) return true;

        if (isInitialOpen(item.children)) return true;
    }
    return false
}




const props = defineProps({
    title: String,
    icon: String,
    children: Array,
    isSearching: Boolean
})



onMounted(() => {
    isOpen.value = isInitialOpen(props.children)

})
</script>

<template>



    <button type="button" @click="isOpen = !isOpen" dir="auto"
        class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-neutral-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hs-accordion-active:text-white">
        <VIcon :icon="icon" />

        {{ title }}
        <VIcon icon="mdi-chevron-up" class="transition" :class="{ 'rotate-180': isOpen }" />


    </button>
    <ul class=" py-2 space-y-2 ms-5" :class="{ 'hidden': !isOpen && !isSearching }">

        <li v-for="item in children">

            <AppNavigationMenuLeaf v-if="item.children.length == 0" :href="item.href" :icon="item.icon"
                :title="item.title" />

            <AppNavigationMenuItemGroup v-else :children="item.children" :icon="item.icon" :title="item.title"
                :is-searching="isSearching" />

        </li>

    </ul>
</template>
