<script setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import { VBtn, VSnackbar } from 'vuetify/lib/components/index.mjs';

const isShowed = ref(false);
const message = ref(null)
const style = ref('success')




const open = (_message, _style = 'success') => {
    isShowed.value = false;
    isShowed.value = true;
    message.value = _message;
    style.value = _style

}




defineExpose({ open })

</script>

<template>

    <VSnackbar v-model="isShowed" position="right bottom" :color="style">
        {{ message }}

        <template v-slot:actions>
            <VBtn color="white" variant="text" @click="isShowed = false">
                {{$t("Close")}}
            </VBtn>
        </template>
    </VSnackbar>
</template>