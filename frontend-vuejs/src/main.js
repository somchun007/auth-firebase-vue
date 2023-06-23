import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
// import store from "./store";

Vue.config.productionTip = false;

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import i18n from "./locale/index"


new Vue({
  router,
  // store,
  render: (h) => h(App),
  i18n,
}).$mount("#app");
