const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

router.get('/', async (req, res) => {
    try {
        const allTodos = await Todo.find({})
        res.render('index', { allTodos: allTodos })
    } catch {
        res.send('Error retrieving all todos')
    }
})

router.post('/', async (req, res) => {
    const todo = await new Todo({
    content: req.body.content
    })

    try {
        await todo.save()
        res.redirect('/')
    } catch {
        res.send('Error Creating todo')
    }
})

router.get('/todo/:id/edit', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.render('edit', {todo: todo})
    } catch {
        res.redirect('/')
    }
})

router.put('/todo/:id', async (req, res) => {
    let todo
    try {
        todo = await Todo.findById(req.params.id)
        todo.content = req.body.content
        await todo.save()
        res.redirect('/')
    } catch {
        if (todo == null) {
            res.redirect('/')
        }
        res.redirect(`/todo/${todo.id}/edit`)
    }
})

router.delete('/todo/:id', async (req, res) => {
    let todo
    try {
        todo = await Todo.findById(req.params.id)
        await todo.remove()
        res.redirect('/')
    } catch {
        res.send('Error removing todo')
    }
})

module.exports = router