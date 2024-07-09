<script setup>
import { ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';

import { VAppBar, VAppBarNavIcon, VBtn, VCard, VContainer, VIcon, VLayout, VList, VListItem, VMain, VMenu, VNavigationDrawer, VSpacer, VSwitch } from 'vuetify/lib/components/index.mjs';


import { useLocale } from 'vuetify/lib/framework.mjs';
import { translate } from '@/utils/translation';
import { useI18n } from 'vue-i18n';
import AppNavigationMenu from './AppNavigationMenus/AppNavigationMenu.vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
useI18n
defineProps({
    title: String,
});
const { current, t } = useLocale()
const { locale } = useI18n();
const isSideBarShown = ref(false);

const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
};

function changeLocale(newLocal) {
    // current.value = newLocal
    // locale.value = newLocal;
    localStorage.setItem("locale", newLocal)
    window.location.reload();

}

const drawer = ref(true)
// const isEnglish =ref(current.value == 'en')
const lang = ref(localStorage.getItem('locale'))
console.log(current.value);


</script>

<template>

    <VCard>
        <VLayout>
            <VAppBar color="" prominent>
                <VAppBarNavIcon variant="text" @click.stop="drawer = !drawer"></VAppBarNavIcon>
                <VSpacer></VSpacer>



                <div class="flex gap-2 p-3 justify-center items-center">
                    <VSwitch v-model="lang" false-value="ar" true-value="en" :label="lang" hide-details
                        @change="changeLocale(lang)" />
                    <VBtn icon="mdi-bell-ring-outline" />

                    <VBtn icon="mdi-account" id="open-app-menu" />


                </div>


                <VMenu :close-on-content-click="false" location="end" activator="#open-app-menu">
                    <VCard>
                        <div
                            class="   min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700">
                            <div class="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-neutral-800">
                                <p class="text-sm text-gray-500 dark:text-neutral-400">
                                    {{ translate('signed_in_as') }}
                                </p>

                                <p class="text-sm font-medium text-gray-800 dark:text-neutral-300">
                                    {{ $page.props.auth.user.email }}
                                </p>
                            </div>
                            <div class="mt-2 py-2 first:pt-0 last:pb-0">
                                <Link
                                    class="flex  items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                                    :href="route('profile.show')">
                                <VIcon icon="mdi-account-tie-outline" />
                                {{ $t("profile") }}
                                </Link>
                                <hr class="my-2">
                                <Link
                                    class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                                    @click="logout">
                                <VIcon icon="mdi-logout" />
                                {{ $t("logout") }}

                                </Link>
                            </div>
                        </div>
                    </VCard>
                </VMenu>

            </VAppBar>

            <VNavigationDrawer v-model="drawer" :location="$vuetify.display.mobile ? 'top' : undefined" :order="-1"
                :temporary="$vuetify.display.mobile">
                <VList>
                    <VListItem>
                        <!-- <ApplicationLogo/> -->
                        <Link class=" inline-block hover:opacity-80" :href="route('dashboard')">
                        <!-- <ApplicationLogo /> -->
                        <ApplicationLogo />
                        

                        </Link>
                    </VListItem>

                    <AppNavigationMenu />

                </VList>

            </VNavigationDrawer>

            <VMain class="min-h-[100vh]">
                <VContainer>

                    <slot />
                </VContainer>
            </VMain>
        </VLayout>
    </VCard>



</template>