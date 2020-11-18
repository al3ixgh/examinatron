const express = require('express')
const Pregunta = require('../models/pregunta')
const router = new express.Router()

router.post('/preguntas', async (req, res) => {
    const pregunta = new Pregunta(req.body)

    try {
        await pregunta.save()
        res.status(201).send(Pregunta)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/preguntas', async (req, res) => {
    try {
        const preguntas = await Pregunta.find({})
        res.send(preguntas)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/preguntas/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const pregunta = await Pregunta.findById(_id)

        if (!pregunta) {
            return res.status(404).send()
        }

        res.send(pregunta)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/preguntas/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['pregunta','respuesta1','respuesta2','respuesta3','respuesta4']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const pregunta = await Pregunta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!pregunta) {
            return res.status(404).send()
        }

        res.send(pregunta)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/preguntas/:id', async (req, res) => {
    try {
        const pregunta = await Pregunta.findByIdAndDelete(req.params.id)

        if (!pregunta) {
            res.status(404).send()
        }

        res.send(pregunta)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router