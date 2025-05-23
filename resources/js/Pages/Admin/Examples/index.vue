<template>
    <AppLayout>
        <VRow>

            <VCol cols="12" class="pb-0">
                <div class="d-flex justify-between  items-center  mb-[-10px] w-100 my-2">
                    <div class="d-flex justify-between  items-center">
                        <span class="dash-headline me-5">{{ translate('games') }}</span>
                        <VBreadcrumbs :items="breadcrumbs" class="text-sm"></VBreadcrumbs>
                    </div>
                    <div class="d-flex gap-3">

                        <VBtn color="primary" @click="openCreateDialog" append-icon="mdi-plus">{{
                            translate('add_game') }}
                        </VBtn>
                        <VBtn color="secondary " @click="openCreateDialog">{{ translate('some_other_action') }}</VBtn>
                    </div>

                </div>
            </VCol>

            <VCol cols="12" class="pb-0">
                <VExpansionPanels class="mb-2" v-model="isFilterPanelOpened">
                    <VExpansionPanel title="Advanced Filter" value="filterPanel">
                        <template v-slot:text>
                            <div class="grid grid-cols-12 gap-x-4">

                                <VSelect label="Country" class="col-span-4"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined" density="compact" />


                                <VSelect label="Games" class="col-span-4"
                                    :items="['Fifa', 'Call of duty', 'Blood borne',]" variant="outlined"
                                    density="compact" />

                                <VRadioGroup inline label="Radio group label" class="col-span-12">
                                    <VRadio label="Released" value="one"></VRadio>
                                    <VRadio label="Not Released" value="two"></VRadio>
                                    <VRadio label="Unknown" value="three"></VRadio>
                                </VRadioGroup>

                                <div class="col-span-6 grid grid-cols-12 gap-x-2">

                                    <div class="col-span-6">
                                        <VDateInput clearable label="From" variant="outlined" density="compact" />
                                    </div>
                                    <div class="col-span-6">

                                        <VDateInput clearable label="to" variant="outlined" density="compact" />
                                    </div>
                                </div>


                            </div>
                        </template>
                    </VExpansionPanel>
                </VExpansionPanels>
            </VCol>

            <VCol cols="12">
                <VCard>

                    <VCardText>
                        <VDataTableServer :headers="headers" :items="paginator.data" :search="searchTime"
                            :items-length="paginator?.total" :loading="isListLoading" @update:options="loadItems"
                            item-value="id" class="elevation-1">
                            <template v-slot:top>
                                <VToolbar flat class="px-2">

                                    <VTextField v-model="search" :label="translate('search')" single-line hide-details
                                        density="compact" :placeholder="translate('search_place_holder')" />
                                    <VBtn color="primary" icon="mdi-magnify" @click="refreshList" />
                                    <VSpacer />
                                    <VToolbarTitle class="text-end">{{ translate('game_list') }}</VToolbarTitle>
                                </VToolbar>


                            </template>


                            <template v-slot:item.actions="{ item }">



                                <VMenu>
                                    <template v-slot:activator="{ props }">
                                        <VBtn icon="mdi-dots-vertical" v-bind="props" size="x-small"></VBtn>
                                    </template>

                                    <VList slim>
                                        <VListItem style="font-size: 2px;">

                                            <VBtn variant="text" @click="deleteRecord(item)">{{ translate('Delete') }}
                                            </VBtn>

                                        </VListItem>

                                        <VListItem style="font-size: 2px;" cli>

                                            <VBtn variant="text" @click="openEditDialog(item)">{{ translate('Edit') }}
                                            </VBtn>
                                        </VListItem>
                                    </VList>
                                </VMenu>
                            </template>
                            <template v-slot:loading>
                                <VSkeletonLoader type="table-tbody"></VSkeletonLoader>
                            </template>
                        </VDataTableServer>
                    </VCardText>


                </VCard>
            </VCol>

        </VRow>



        <VDialog v-model="createDialog" max-width="600px">

            <CreateForm @close-dialog="createDialog = false" @save-success="onSaveSuccess"
                :editing-record-id="editRecordId" />
        </VDialog>

        <VDialog v-model="updateDialog" max-width="600px">

            <UpdateForm @close-dialog="updateDialog = false" @save-success="onSaveSuccess"
                :editing-record-id="editRecordId" />
        </VDialog>



        <ConfirmationAlert ref="confirmationAlert" />
        <SnackMessage ref="snackMessage" />
        <PageLoader ref="pageLoader" />

    </AppLayout>
</template>

<script setup>



import { ref, reactive, watch } from 'vue';
import { VBreadcrumbs, VBtn, VCard, VCardText, VCol, VDataTableServer, VDialog, VExpansionPanel, VExpansionPanels, VList, VListItem, VListItemTitle, VMenu, VRadio, VRadioGroup, VRow, VSelect, VSkeletonLoader, VSpacer, VSwitch, VTextField, VToolbar, VToolbarTitle } from 'vuetify/lib/components/index.mjs';
import AppLayout from '@/Layouts/Admin/AdminLayout.vue';
import { breadcrumbs, deleteRecordApi, getRecordsListApi, gridHeaders, initialFilterForm } from './core';
import ConfirmationAlert from '@/Components/ConfirmationDialog.vue';
import SnackMessage from '@/Components/SnackMessage.vue';
import PageLoader from '@/Components/PageLoader.vue';
import { VDateInput } from 'vuetify/lib/labs/components.mjs';
import { translate } from '@/utils/translation';
import CreateForm from './CreateForm.vue';
import UpdateForm from './UpdateForm.vue';

const menu = ref(false)

const snackMessage = ref();
const confirmationAlert = ref(null)
const isListLoading = ref(true)
const pageLoader = ref(false)
const isFilterPanelOpened = ref('')
const createDialog = ref(false);
const updateDialog = ref(false);
const searchTime = ref('');
const search = ref('');
var editRecordId = null;
const headers = ref(gridHeaders);



const paginator = ref({
    data: [],
    total: 0
});


const initialFilterFormState = initialFilterForm

const FilterForm = reactive({
    ...initialFilterFormState,
})


watch(search, async (newSearch, oldSearch) => {
    refreshList();
});





const openCreateDialog = () => {
    editRecordId = null
    createDialog.value = true;
}


const openEditDialog = (context) => {
    updateDialog.value = true;
    editRecordId = context.id

}

const closeDialog = () => {
    createDialog.value = false;
    updateDialog.value = false;
};


const onSaveSuccess = () => {
    snackMessage.value.open("created successful", 'success')
    refreshList();
    closeDialog();
}



const refreshList = () => {
    searchTime.value = String(Date.now())
}


const loadItems = ({ page, perPage, sortBy }) => {

    isListLoading.value = true
    var sortByOrder = sortBy?.at(0)?.order ?? ""
    var sortByKey = sortBy?.at(0)?.key ?? ""
    var filters = {};
    if (isFilterPanelOpened.value == 'filterPanel') filters = { ...FilterForm }

    var params = {
        per_page: perPage,
        page: page,
        sort_by_key: sortByKey,
        sort_by_order: sortByOrder,
        search: search.value,
        ...filters
    }
    getRecordsListApi(params, (response) => {
        paginator.value = response.data
    }, onRequestErrorHandler, onBeforeListRequestHandler, onAfterListRequestHandler)

}



const deleteRecord = async (record) => {
    // if (! await confirmationAlert.value.open("Confirmation", "Are you Sure you want to delete this record ?")) return;
    if (! await confirmationAlert.value.open()) return;

    deleteRecordApi(record.id, (response) => {
        snackMessage.value.open(translate("DeletedSuccessfully"), 'success');
        refreshList();
    }, onRequestErrorHandler, onBeforePageRequestHandler, onAfterPageRequestHandler);

}



const onRequestErrorHandler = (err) => {

    snackMessage.value.open(err ?? translate("SomeErrorOccurred"), 'error')
}

const onBeforeListRequestHandler = () => {
    isListLoading.value = true;

}
const onAfterListRequestHandler = () => {
    isListLoading.value = false;
}

const onBeforePageRequestHandler = () => {
    pageLoader.value = true;

}
const onAfterPageRequestHandler = () => {
    pageLoader.value = false;
}





</script>
