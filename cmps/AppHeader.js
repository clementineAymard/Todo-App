import LoginSignup from './LoginSignup.js'

export default {
    template: `
    <section class="app-header">
        <RouterLink class="logo" to="/">To-dos</RouterLink>
        <div v-if="user" class="progress-bar">
        {{fullname}}'s progress : <div id="myProgress">
            <div id="myBar" :style="'width:' + width + '%;'"></div>
        </div>
        </div>
        <div class="btn-ham-menu" @click="toggleMenu"></div>
        <nav :class="isMenuShownClass">
            <RouterLink to="/" @click="toggleMenu">Home</RouterLink>
            <RouterLink to="/todo" @click="toggleMenu">Todos</RouterLink>
            <RouterLink to="/user" v-if="user" @click="toggleMenu">Account</RouterLink>
            <a v-if="user" @click="logout">Logout</a>
            <RouterLink to="/login" v-if="!user" @click="toggleMenu">Login / Signup</RouterLink>
        </nav>
    </section>
    `,
    data() {
        return {
            isMenuShown:false
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        fullname(){
            return this.$store.getters.fullname.split(' ')[0]
        },
        width() {
            var progress = this.$store.getters.progress
            return progress
        },
        isMenuShownClass(){
            return this.isMenuShown ? 'menu-open' : ''
        }
    },
    methods: {
        logout() {
            this.toggleMenu()
            this.$store.commit({ type: 'logout' })
        },
        toggleMenu(){
            this.isMenuShown = !this.isMenuShown
        }
    }
}