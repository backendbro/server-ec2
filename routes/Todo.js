const router = require('express').Router()
const {
    getTodo, 
    addTodo, 
    clearTodo, 
    deleteTodo
} = require('../controller/Todo')

router.get('/', getTodo)
router.post('/', addTodo) 
router.delete('/', clearTodo) 
router.delete('/:id', deleteTodo)

module.exports = router 