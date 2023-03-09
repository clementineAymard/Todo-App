export default {
    template: `
        <section class="user-space">
            <div class="user-details">
                <h1>Hi {{fullname}} !</h1>
                <ul>
                    <li v-for="activity in user.activities">
                        <pre>{{activity}}</pre>
                    </li>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
       
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        fullname(){
            return this.$store.getters.fullname
        }
    }
}