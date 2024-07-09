<script setup>
import { computed, onMounted, watch } from 'vue';
import { Link } from '@inertiajs/vue3';
import { VIcon, VList, VListItem, VTextField } from 'vuetify/lib/components/index.mjs';
import { ref } from 'vue';
import AppNavigationMenuItemGroup from './AppNavigationMenuItemGroup.vue';
import AppNavigationMenuLeaf from './AppNavigationMenuLeaf.vue';
import MenuContributor from './MenuContributor';
import { translate } from '@/utils/translation';

const menuItems = MenuContributor;


const proxyMenuItems = ref(Object.assign([], menuItems))


const search = ref('');

const filter = (items, searchText) => {
    var matchedFlag = false;

    var temp = Object.assign([], items)
    var removedIndexes = [];
    for (let index = 0; index < items.length; index++) {
        const item = items[index];

        var matched = item.title.toLowerCase().match(searchText.toLowerCase())


        if (matched) {


            matchedFlag = true;
            continue;
        }
        var result = filter(item.children, searchText)
        if (result.flag) {
            matchedFlag = true;
            item.children = result.newItems
        }
        else {

            removedIndexes.push(index);


        }
    }
    temp = temp.filter((value, index) => !removedIndexes.includes(index));



    return {
        flag: matchedFlag,
        newItems: temp
    };
}


watch(search, async (newSearch, oldSearch) => {
    updateMenuList(newSearch)
});


const updateMenuList = (searchText) => {


    console.log(searchText);
    var tempMenu = Object.assign([], menuItems);
    if (!searchText) {
        proxyMenuItems.value = tempMenu

        return;
    }

    var result = filter(tempMenu, searchText)


    proxyMenuItems.value = result.newItems;
    

};




</script>

<template>
    
    <VList class="space-y-2">

        <VListItem class="">
            <VTextField :label="translate('search_place_holder')" append-icon="mdi-magnify" variant="underlined"
                v-model="search" />
        </VListItem>



        <VListItem v-for="item in proxyMenuItems">
            <AppNavigationMenuLeaf v-if="item.children.length == 0" :href="item.href" :icon="item.icon"
                :title="item.title" />
            <AppNavigationMenuItemGroup v-else :children="item.children" :icon="item.icon" :title="item.title"
                :is-searching="search != ''" />


        </VListItem>

    </VList>
</template>
