import "./bootstrap";
import "../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import { createVuetify } from "vuetify/lib/framework.mjs";
import { en, ar } from "vuetify/locale";
import i18n from "./i18n";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
const savedLocale = localStorage.getItem("locale") || "en";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {
        const vuetify = createVuetify({
            locale: {
                locale: savedLocale,
                fallback: "en",
                messages: { en, ar },
            },
        });
        var app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(vuetify)
            .use(i18n)
            .mount(el);

        return app;
    },
    progress: {
        color: "#4B5563",
    },
});
