import { storageService } from "./storage.service.js"

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// localStorage.clear()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    addActivity,
}

_createUsers()

function getLoggedinUser() {
    const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    console.log(JSON.parse(str))
    return JSON.parse(str)
    // return str
}

function login({ username, password }) {
    var users = storageService.load(USER_KEY)
    if (users) {
        const user = users.find(u => u.username === username && u.password === password)
        if (user) {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
            return user
        }
    }
    return
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function signup({ fullname, username, password }) {
    var users = storageService.load(USER_KEY)
    const user = users.find(u => u.username === username)
    if (user) return null

    var newUser = _createUser(fullname, username, password)
    users.push(newUser)
    storageService.store(USER_KEY, users)

    login({ username, password })
    return newUser
}

function addActivity(activity) {
    var user = getLoggedInUser()
    user.activities.push({ txt: activity, at: Date.now() })
    var users = storageService.load(USER_KEY)
    users.push(user)
    storageService.store(USER_KEY, users)
}

function getEmptyUser() {
    return {
        fullname: '',
        username: '',
        password: '',
        balance: 0,
        activities: []
    }
}

function _createUsers() {
    var users = storageService.load(USER_KEY)
    if (!users || !users.length) {
        users = [
            _createUser('Clem Aymard', 'Clem', '258', 2500, [{ txt: 'Added a todo', at: Date.now() }]),
            _createUser('Yossef Aymard', 'Yo', '321', 13000, [{ txt: 'Added a todo', at: Date.now() - 286000 }, { txt: 'Removed a todo', at: Date.now() - 62000 }])
        ]
        storageService.store(USER_KEY, users)
    }
    return users
}

function _createUser(fullname, username, password, balance = 0, activities = []) {
    return {
        fullname,
        username,
        password,
        balance,
        activities
    }
}