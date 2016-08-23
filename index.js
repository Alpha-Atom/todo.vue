var Vue = require('vue');

var app = new Vue({
  el: '#app',
  data: {
    title: "Todo List",
    newTodo: '',
    todos: [],
  },
  methods: {
    add: function () {
      var text = this.newTodo.trim()
      if (text) {
        this.todos.push({ text: text, complete: false, style: {}})
        this.newTodo = ''
      }
    },
    remove: function (idx) {
      this.todos.splice(idx, 1)
    },
    complete: function (idx) {
      if (this.todos[idx].complete === false) {
        this.$set('todos["'+ idx + '"]["style"]["text-decoration"]', 'line-through')
        this.$set('todos["' + idx + '"].complete', true);
      } else {
        this.$set('todos["'+ idx + '"]["style"]["text-decoration"]', 'none')
        this.$set('todos["' + idx + '"].complete', false);
      }
    },
    up: function (idx) {
      var elAbove = JSON.parse(JSON.stringify(this.todos[idx-1]))
      var elBelow = JSON.parse(JSON.stringify(this.todos[idx]))
      this.$set('todos["' + (idx-1) + '"]', elBelow)
      this.$set('todos["' + idx + '"]', elAbove)
    },
    down: function (idx) {
      var elAbove = JSON.parse(JSON.stringify(this.todos[idx]))
      var elBelow = JSON.parse(JSON.stringify(this.todos[idx+1]))
      this.$set('todos["' + (idx+1) + '"]', elAbove)
      this.$set('todos["' + idx + '"]', elBelow)
    }
  }
})

