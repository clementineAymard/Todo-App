import TodoPreview from './TodoPreview.js'
export default {
    props: ['todos'],
    template: `
        <section class="todo-list">
            <ul>
                <li v-for="todo in todos">
                    <TodoPreview :todo="todo" @click="toggleCheckTodo(todo._id)" title="Click to check/uncheck"/>
                    <div> | 
                        <button @click="this.$router.push('/todo/edit/'+todo._id)" >Edit</button> <span> | </span>
                        <button @click="this.$router.push('/todo/' + todo._id)" title="Go to details">See</button> <span> | </span>
                        <button @click="removeTodo(todo._id)" title="Delete"> X </button>
                    </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        TodoPreview,
    },
    methods: {
        toggleCheckTodo(todoId){
            console.log('toggle todo status', todoId)
            this.$emit('toggleTodoStatus', todoId)
        },
        removeTodo(todoId){
            this.$emit('removeTodo', todoId)
        }
    },
}