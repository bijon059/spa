import { createApp, markRaw} from 'vue'
import App from './App.vue'
import router from './router'
import  pinia  from "./libraries/store";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "../src/assets/css/style.css"
pinia.use(({store,pinia}) => {
    store.$router = markRaw(router);
    pinia.$router = markRaw(router);
});
createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
