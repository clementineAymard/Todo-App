import { todoService } from "../services/todo.service.js"

// import CMP from './'
export default {
    // props:[], 
    template: `
    <section class="todo-edit">
    <RouterLink to="/todo">Back to to-do list</RouterLink>
        <div>
            Edit task : 
            <input type="text" v-model="newTodo.task">
            <button @click="editTodo">Save change</button>
        </div>
    </section>
    `,
    data() {
        return {
            newTodo: {}
        }
    },
    methods: {
        editTodo() {
            console.log('edit save')
            this.$store.commit({ type: 'editTodo', newTodo: this.newTodo })
            this.$router.push('/todo')
        }
    },
    computed: {},
    created() {
        console.log(this.$route.params.todoId)
        this.newTodo = todoService.getById(this.$route.params.todoId)
    },
    // etc.
    // components:{},
}