import Vue from "vue";
import ElementUI from 'element-ui';
import AOS from 'aos';
import Loading from "vue-loading-overlay";
import DatePicker from "vue2-datepicker";

import 'element-ui/lib/theme-chalk/index.css';
import '@assets/scss/element-variables.scss'
import 'aos/dist/aos.css'; 
import 'vue-loading-overlay/dist/vue-loading.css';
import 'vue2-datepicker/index.css';

Vue.use(ElementUI);
AOS.init();
Vue.use(Loading);
Vue.use(DatePicker);