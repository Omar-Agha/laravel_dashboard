<script setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import { VBtn, VCard, VCardActions, VCardText, VDialog, VSpacer, VToolbar, VToolbarTitle } from 'vuetify/lib/components/index.mjs';

const dialog = ref(false);
var resolve = null
const message = ref(null)
const title = ref(null)
const options = reactive({
    color: "grey lighten-3",
    width: 400,
    zIndex: 200,
    noconfirm: false

})





const open = (_title, _message, _options) => {
    dialog.value = true;
    title.value = _title;
    message.value = _message;
    // options = Object.assign(options, _options);
    return new Promise((_resolve, reject) => {
        resolve = _resolve;

    });
}
const agree = () => {
    resolve(true);
    dialog.value = false;
}

const cancel = () => {
    resolve(false);
    dialog.value = false;
}


defineExpose({ open })

</script>

<template>

    <VDialog v-model="dialog" max-width="900" persistent>


       
        <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div class=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div
                class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                <div class="md:flex items-center mt-3">
                    <div
                        class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                        <i class="bx bx-error text-3xl">
                            ⚠
                        </i>
                    </div>
                    <div class=" md:mt-0 md:ml-6 text-center md:text-left">
                        <p class="font-bold">{{$t("Warning!")}}</p>
                        <p class="text-sm text-gray-700 mt-1">{{ $t("DeleteConfirmationMessage") }}
                        </p>
                    </div>
                </div>

                <div class="text-center md:text-right mt-5 md:flex md:justify-end">
                    <button id="confirm-delete-btn" @click="agree"
                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                        {{$t('Delete')}}
                    </button>

                    <button id="confirm-cancel-btn" @click="cancel"
                        class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 text-black rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                        {{$t("Cancel")}}
                    </button>
                </div>
            </div>
        </div>
    </VDialog>

</template>