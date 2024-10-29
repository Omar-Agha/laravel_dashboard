<template>

    <VCard>
        <VCardTitle>
            <span v-if="!isEdit" class="headline">{{ $t("CreateNewGame") }}</span>
            <span v-else class="headline">{{ $t("UpdateRecord") }}</span>
        </VCardTitle>

        <VForm @submit.prevent>


            <VCardText>
                <VTextField v-model="recordForm.name" :label="translate('Name')"
                    :error-messages="appPage.props.errors.name || v$.name.$errors.map(e => e.$message)" />

                <VTextField v-model="recordForm.father_name" :label="translate('FatherName')"
                    :error-messages="appPage.props.errors.father_name || v$.father_name.$errors.map(e => e.$message)" />

                <VDateInput v-model="recordForm.birth_date" :label="translate('BirthDate')" clearable
                    :error-messages="appPage.props.errors.birth_date || v$.birth_date.$errors.map(e => e.$message)" />


                <VFileInput v-model="recordForm.uploaded_avatar" :label="translate('Avatar')"
                    :error-messages="appPage.props.errors.uploaded_avatar || v$.uploaded_avatar.$errors.map(e => e.$message)" />








            </VCardText>
            <VCardActions>
                <VBtn type="submit" color="primary" @click="saveRecord">{{ isEdit ? translate("Update") :
                    translate("Create") }}
                </VBtn>
                <VBtn @click="closeDialog">{{ translate('Cancel') }}</VBtn>
            </VCardActions>
        </VForm>

    </VCard>




    <ConfirmationAlert ref="confirmationAlert" />
    <SnackMessage ref="snackMessage" />
    <PageLoader ref="pageLoader" />
</template>

<script setup>

import { ref, reactive, watch } from 'vue';
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VFileInput, VForm, VTextField } from 'vuetify/lib/components/index.mjs';

import { usePage } from '@inertiajs/vue3';
import { getRecordById, initialUpdateForm, storeRecordApi, updateFormRules, updateRecordApi } from './core';
import { useVuelidate } from '@vuelidate/core'
import ConfirmationAlert from '@/Components/ConfirmationDialog.vue';
import SnackMessage from '@/Components/SnackMessage.vue';
import PageLoader from '@/Components/PageLoader.vue';
import { computed } from 'vue';
import { translate } from '@/utils/translation';
import { VDateInput } from 'vuetify/lib/labs/components.mjs';


const snackMessage = ref();

const pageLoader = ref(false)

const isEdit = computed(() => {
    return props.editingRecordId != null
});

const appPage = usePage();


const initialFormState = initialUpdateForm;

const recordForm = reactive({
    ...initialFormState,
})


const emit = defineEmits(['close-dialog', 'save-success']);
const props = defineProps({
    editingRecordId: Number
})

const v$ = useVuelidate(updateFormRules, recordForm)

function clearForm() {
    v$.value.$reset()
    for (const [key, value] of Object.entries(initialFormState)) {
        recordForm[key] = value
    }
    for (const [key, value] of Object.entries(appPage.props.errors)) {
        appPage.props.errors[key] = "";
    }


}



const saveRecord = async () => {

    var isValid = await v$.value.$validate();
    if (!isValid) return;


    if (isEdit.value) {
        updateRecord();
    }
    else {
        createRecord();
    }



};

const closeDialog = () => {
    clearForm();

    emit('close-dialog')
};

const createRecord = () => {

    storeRecordApi(recordForm, (response) => {

        emit('save-success');
        clearForm()
    }, onRequestErrorHandler, onBeforePageRequestHandler, onAfterPageRequestHandler)

}


const updateRecord = () => {

    updateRecordApi(props.editingRecordId, recordForm, (response) => {
        emit('save-success');
        clearForm()
    }, onRequestErrorHandler, onBeforePageRequestHandler, onAfterPageRequestHandler)

}


const onRequestErrorHandler = (err) => {

    snackMessage.value.open(err ?? "Some Error Occurred", 'error')

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




watch(() => props.editingRecordId, (newValue, oldValue) => {
    clearForm();
    if (newValue != null) {
        
        getRecordById(newValue, (data) => {
            Object.assign(recordForm, data.data)

        })
    }

}, { immediate: true, deep: true });


</script>
