var Vue = require('vue');;

var existingTodos = localStorage.getItem('todos')

var app = new Vue({
  el: '#app',
  data: {
    title: "Todo List",
    newTodo: '',
    todos: existingTodos ? JSON.parse(existingTodos) : []
  },
  methods: {
    add: function () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({ text: text, complete: false, style: {}})
        this.save()
        this.newTodo = ''
      }
    },
    remove: function (idx) {
      this.todos.splice(idx, 1)
      this.save()
    },
    complete: function (idx) {
      if (this.todos[idx].complete === false) {
        this.$set('todos["'+ idx + '"]["style"]["text-decoration"]', 'line-through')
        this.$set('todos["' + idx + '"]["complete"]', true)
      } else {
        this.$set('todos["'+ idx + '"]["style"]["text-decoration"]', 'none')
        this.$set('todos["' + idx + '"]["complete"]', false)
      }
      this.save()
    },
    up: function (idx) {
      var elAbove = JSON.parse(JSON.stringify(this.todos[idx-1]))
      var elBelow = JSON.parse(JSON.stringify(this.todos[idx]))
      this.$set('todos["' + (idx-1) + '"]', elBelow)
      this.$set('todos["' + idx + '"]', elAbove)
      this.save()
    },
    down: function (idx) {
      var elAbove = JSON.parse(JSON.stringify(this.todos[idx]))
      var elBelow = JSON.parse(JSON.stringify(this.todos[idx+1]))
      this.$set('todos["' + (idx+1) + '"]', elAbove)
      this.$set('todos["' + idx + '"]', elBelow)
      this.save()
    },
    save: function () {
      var localTodos = JSON.stringify(this.todos)
      localStorage.setItem('todos', localTodos)
    }
  }
})

