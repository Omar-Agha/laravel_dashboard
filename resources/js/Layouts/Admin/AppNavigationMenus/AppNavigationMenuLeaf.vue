<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';
import { VIcon, VListItem } from 'vuetify/lib/components/index.mjs';
import { ref } from 'vue';



const props = defineProps({
    href: String,
    title: String,
    icon: String,
});

const isOpen = ref(false)

const active_classes = ref("bg-gray-100 darkxz:bg-neutral-700 darkxz:text-neutral-300")



</script>

<template>


    <Link dir="auto"
        class="cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-neutral-700 rounded-lg hover:bg-gray-100 darkxz:hover:bg-neutral-700 darkxz:text-neutral-400 darkxz:hover:text-neutral-300"
        :class="{ 'bg-gray-100 darkxz:bg-neutral-700 darkxz:text-neutral-300': route().current(href) }" :href="route(href)">
    <VIcon :icon="icon" />
    {{ title }}
    </Link>


</template>
