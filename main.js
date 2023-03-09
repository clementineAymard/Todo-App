'use strict'

const { createApp } = Vue

import { router } from './router.js'
import { store } from './store/store.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
    template: `
    <section class="main">
        <AppHeader/>
        <RouterView/>
        <AppFooter/>
        <UserMsg/>
    </section>
    `,
    created(){

    },
    components:{
        AppHeader,
        AppFooter,
        UserMsg
    },
}
const app = createApp(options)

app.use(router)
app.use(store)

app.mount('#app')