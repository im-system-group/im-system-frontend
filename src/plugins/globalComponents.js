import LoadingSpinner from "../components/LoadingSpinner";
import imAvator from "../components/imAvator";

export default {
    install(Vue) {
        Vue.component(LoadingSpinner.name, LoadingSpinner);
        Vue.component(imAvator.name, imAvator);
    }
};
