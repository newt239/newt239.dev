import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'

const app = createApp(App)

app.use(router)


app.use(VueGtag, {
    config: { id: "G-WP0FNML0VP" }
})

app.mount('#app')
