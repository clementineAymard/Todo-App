import { todoService } from "../services/todo.service.js"

// import CMP from './'
export default {
    // props:[], 
    template: `
        <section class="todo-details">
            <RouterLink to="/todo">Back to to-do list</RouterLink>
            <div class="details flex-column">

                <div><span>Task: </span>{{todo.task}}</div>
                <div><span>Date created: </span>{{date}}</div>
               <div class="cap"><span>Status :  </span>{{todo.status}}</div>

            </div>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {},
    computed: {
        todo(){
            return todoService.getById(this.$route.params.todoId)
        },
        date(){
            var formattedDate = new Date(this.todo.createdAt)
            const option = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                // hour12: false,
            }
            return new Intl.DateTimeFormat('en', option).format(formattedDate)
        }
    },
    // created(){},
    // etc.
    // components:{},
}