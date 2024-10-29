import { translate } from "@/utils/translation";
import { router } from "@inertiajs/vue3";
import { required } from "@vuelidate/validators";
import axios from "axios";
import { date } from "yup";

const ROUTE_NAME = "examples";

export const breadcrumbs = [
    {
        title: translate("dashboard"),
        disabled: false,
        href: "breadcrumbs_dashboard",
    },
    {
        title: translate("newspaper"),
        disabled: false,
        href: "breadcrumbs_link_1",
    },
    {
        title: translate("link2"),
        disabled: true,
        href: "breadcrumbs_link_2",
    },
];

export const gridHeaders = [
    { title: translate("Name"), align: "start", value: "name", sortable: true },
    { title: translate("FatherName"), key: "father_name" },
    { title: translate("MotherName"), key: "mother_name" },
    { title: translate("BirthDate"), key: "birth_date" },
    { title: translate("Avatar"), key: "avatar" },
    { title: translate("Actions"), key: "actions", sortable: false },
];

export const initialCreateForm = {
    name: "",
    father_name: "",
    birth_date: new Date(),
    mother_name: null,
    uploaded_avatar: null,
};

export const storeFormRules = {
    name: { required },
    birth_date: { required },
    father_name: {},
    mother_name: { required },
    uploaded_avatar: { required },
};

export const initialUpdateForm = {
    birth_date: new Date(),
    father_name: "",
    name: "",
    uploaded_avatar: null,
};

export const updateFormRules = {
    name: { required },
    birth_date: { required }, // 'sometimes' means it's optional, so no need for a validator
    father_name: {},
    uploaded_avatar: {},
};

export const initialFilterForm = {
    isAdmin: false,
    isFootballGame: true,
    role: 0,
};

export const getRecordsListApi = (
    params,
    onSuccessCallback,
    onErrorCallback,
    onBeforeCallback,
    onAfterCallback
) => {
    if (onBeforeCallback != null) onBeforeCallback();

    axios
        .get(route(`${ROUTE_NAME}.index`), {
            params: params,
        })
        .then((data) => {
            if (onSuccessCallback != null) onSuccessCallback(data);
        })
        .catch((err) => {
            if (onErrorCallback != null) onErrorCallback(err);
        })
        .finally(() => {
            if (onAfterCallback != null) onAfterCallback();
        });
};

export const deleteRecordApi = (
    recordId,
    onSuccessCallback,
    onErrorCallback,
    onBeforeCallback,
    onAfterCallback
) => {
    if (onBeforeCallback != null) onBeforeCallback();

    axios
        .delete(route(`${ROUTE_NAME}.destroy`, recordId))
        .then((data) => {
            if (onSuccessCallback != null) onSuccessCallback(data);
        })
        .catch((err) => {
            if (onErrorCallback != null) onErrorCallback(err);
        })
        .finally(() => {
            if (onAfterCallback != null) onAfterCallback();
        });
};

export const updateRecordApi = (
    recordId,
    recordState,
    onSuccessCallback,
    onErrorCallback,
    onBeforeCallback,
    onAfterCallback
) => {
    recordState["_method"] = "PUT";
    router.post(route(`${ROUTE_NAME}.update`, recordId), recordState, {
        
        onBefore: () => {
            if (onBeforeCallback != null) onBeforeCallback();
        },
        onFinish: () => {
            if (onAfterCallback != null) onAfterCallback();
        },
        onSuccess: (data) => {
            if (onSuccessCallback != null) onSuccessCallback(data);
        },
        onError: (err) => {
            console.log(err);
            if (Object.hasOwn(err, "business_logic"))
                if (onErrorCallback != null)
                    onErrorCallback(err.business_logic);
        },
    });
};

export const storeRecordApi = (
    recordState,
    onSuccessCallback,
    onErrorCallback,
    onBeforeCallback,
    onAfterCallback
) => {
    router.post(route(`${ROUTE_NAME}.store`), recordState, {
        onError: (err) => {
            if (Object.hasOwn(err, "business_logic"))
                if (onErrorCallback != null)
                    onErrorCallback(err.business_logic);
        },
        onSuccess: (data) => {
            if (onSuccessCallback != null) onSuccessCallback(data);
        },
        onBefore: () => {
            if (onBeforeCallback != null) onBeforeCallback();
        },
        onFinish: () => {
            if (onAfterCallback != null) onAfterCallback();
        },
    });
};
export const getRecordById = (
    recordId,
    onSuccessCallback,
    onErrorCallback,
    onBeforeCallback,
    onAfterCallback
) => {
    if (onBeforeCallback != null) onBeforeCallback();

    axios
        .get(route(`${ROUTE_NAME}.show`, recordId))
        .then((data) => {
            if (onSuccessCallback != null) onSuccessCallback(data);
        })
        .catch((err) => {
            if (onErrorCallback != null) onErrorCallback(err);
        })
        .finally(() => {
            if (onAfterCallback != null) onAfterCallback();
        });
};
