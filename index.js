const express = require('express')
const methodOverRide = require('method-override')
const path = require('path')
const { v4: uuid } = require('uuid')
const app = express()

app.use(methodOverRide('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Database
let comments = [
    {
        id: uuid(),
        username: 'John',
        comment: 'John is a goat'
    },
    {
        id: uuid(),
        username: 'Jane',
        comment: 'Jane is a funny cat'
    },
    {
        id: uuid(),
        username: 'Bob',
        comment: 'Bob is a dog'
    },
    {
        id: uuid(),
        username: 'Mary',
        comment: 'Mary is beatiful and smart'
    }
]

//GET /comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

//GET /comments/new
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

//POST /comments
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

//GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const { id } = req.params
    const comment = comments.find(comment => comment.id === (id))
    res.render('comments/show', { comment })
})


app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params
    const comment = comments.find(comment => comment.id === (id))
    res.render('comments/edit', { comment })
})

//PATCH /comments/:id
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const newCommentText = req.body.comment
    const foundComment = comments.find(comment => comment.id === (id))
    foundComment.comment = newCommentText
    res.redirect('/comments')
})

//DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    comments = comments.filter(comment => comment.id !== (id))
    res.redirect('/comments')
})

app.listen(process.env.PORT || 3500, () => {
    console.log(`Server Running on port localhost:${process.env.PORT || 3500}`)
})