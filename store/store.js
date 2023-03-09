const { createStore } = Vuex

import { showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'

const storeOptions = {
    strict: true,
    state() {
        return {
            filterBy: { status: 'all' },
            sortBy: { order: -1 },
            todos: todoService.query(),
            user: userService.getLoggedinUser(),
        }
    },
    mutations: {
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setSortBy(state, { sortBy }) {
            state.sortBy = sortBy
        },
        addTodo(state, { newTask }) {
            todoService.save({ task: newTask })
            state.todos = todoService.query()
        },
        removeTodo(state, { todoId }) {
            todoService.remove(todoId)
            state.todos = todoService.query()
        },
        editTodo(state, { newTodo }) {
            // newTodo.createdAt = Date.now() --WOULD BE NICE FOR UPDATES TO BE AT TOP OF LIST TOO
            todoService.save(newTodo)
            state.todos = todoService.query()
        },
        toggleStatus(state, { todoId }) {
            var todo = todoService.getById(todoId)
            // console.log(todo)
            todo.status = todo.status === 'active' ? 'done' : 'active'
            todoService.save(todo)
            state.todos = todoService.query()
        },
        logout(state) {
            userService.logout()
            state.user = userService.getLoggedinUser()
        },
        login(state) {
            state.user = userService.getLoggedinUser()
            state.todos = todoService.query()
        }
    },
    getters: {
        todosForDisplay({ filterBy, sortBy, todos }) {
            console.log(filterBy, sortBy, todos)
            var readyTodos = JSON.parse(JSON.stringify(todos.slice()))
            console.log(readyTodos)
            if (filterBy.status !== 'all')
                readyTodos = readyTodos.filter(todo => todo.status === filterBy.status)
            var regex = new RegExp(filterBy.txt, 'i')
            readyTodos = readyTodos.filter(todo => regex.test(todo.task))
            readyTodos = readyTodos.sort((t1, t2) => (t1.createdAt - t2.createdAt) * sortBy.order)
            return readyTodos
        },
        fullname(state) {
            if (state.user) return state.user.fullname
        },
        progress(state) {
            var done = state.todos.filter(todo => todo.status === 'done').length
            var all = state.todos.length
            console.log(100*(done / all))
            return (100*(done / all))
        }
    }
}

export const store = createStore(storeOptions)