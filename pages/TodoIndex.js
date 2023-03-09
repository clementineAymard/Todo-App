import { showSuccessMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'

import TodoAdd from '../cmps/TodoAdd.js'
import TodoFilter from '../cmps/TodoFilter.js'
import TodoList from '../cmps/TodoList.js'


export default {
    template: `
        <section class="todo-app" v-if="user">
            <TodoFilter 
                @setFilterBy="onSetFilterBy" 
                @setSortBy="onSetSortBy"/>

            <TodoAdd 
                @addTodo="onAddTodo"
                />
                
            <TodoList 
                :todos="todos" 
                @removeTodo="onRemoveTodo"
                @toggleTodoStatus="onToggleTodoStatus"/>            
        </section>
        <RouterLink to="/" v-else class="no-user">Login/Sign-up</RouterLink>
    `,
    data() {
        return {
        }
    },
    created() {},
    computed: {
        user() {
            return this.$store.state.user
        },
        todos() {
            return this.$store.getters.todosForDisplay
        },
    },
    methods: {
        onAddTodo(newTask) {
            console.log(newTask)
            this.$store.commit({ type: 'addTodo', newTask })
        },
        onSetFilterBy(filterBy) {
            this.$store.commit({ type: 'setFilterBy', filterBy: filterBy })
        },
        onSetSortBy(sortBy) {
            this.$store.commit({ type: 'setSortBy', sortBy: sortBy })
        },
        onToggleTodoStatus(todoId) {
            this.$store.commit({ type: 'toggleStatus', todoId })
        },
        onRemoveTodo(id) {
            this.$store.commit({ type: 'removeTodo', id })
        }
        // addToCart(product) {
        //     this.$store.commit({ type: 'addToCart', product })
        //     showSuccessMsg(`TODO: Add ${product._id} to Cart`)
        // },
        // addProduct() {
        //     this.$store.commit({ type: 'addProduct', product: this.productToEdit })
        //     this.productToEdit  = productService.getEmptyProduct()
        // }
    },
    components: {
        TodoAdd,
        TodoFilter,
        TodoList,
    }
}