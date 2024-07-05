import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from "@/store";
const app = createApp(App)

// 全局注册所有 Element Plus 图标
for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(name, component)
}
if (sessionStorage.getItem('store')) {
    const localStore = JSON.parse(sessionStorage.getItem('store'));
    if (localStore) {
        store.replaceState(localStore);
    }
}
app.config.globalProperties.$apiUrl = 'http://10.13.7.36:8001';
app.use(router).use(ElementPlus).use(store).mount('#app')