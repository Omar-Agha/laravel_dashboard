<script setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import { VBtn, VOverlay, VProgressCircular, VSnackbar } from 'vuetify/lib/components/index.mjs';

const isShowed = ref(false);





const show = () => {
    isShowed.value = true;
}
const hide = () => {
    isShowed.value = false;


}




defineExpose({ show, hide })

</script>

<template>

    <VOverlay :model-value="isShowed" class="align-center justify-center" persistent>
        <VProgressCircular color="primary" size="64" indeterminate></VProgressCircular>
    </VOverlay>
</template>