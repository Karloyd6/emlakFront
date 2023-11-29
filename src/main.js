import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'
import * as bootstrap from 'bootstrap';
import "@popperjs/core"
import headerItem from "@/components/global/headerItem.vue"
import footerItem from "@/components/global/footer/footerItem.vue";
import adminHeader from "@/components/global/adminHeader/header.vue"
import router from '@/router/index.js';
import store from "@/store"
import eventEmitter from '@/utils/eventEmitter';
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import sidebar from "@/components/sidebar.vue"

const app = createApp(App)
app.use(router);
app.use(store)
app.use(eventEmitter)
app.config.globalProperties.$store = store;
app.component("infiniteLoading",InfiniteLoading)
app.component("adminHeader",adminHeader)
app.component("headerItem",headerItem);
app.component("footerItem",footerItem);
app.component("sidebar",sidebar);
app.use(bootstrap)
app.mount('#app')
