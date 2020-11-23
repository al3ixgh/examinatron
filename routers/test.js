const express = require('express')
const router = new express.Router()
const Test = require('../models/test')

router.post('/tests', async (req, res) => {
    const test = new Test(req.body)

    try {
        await test.save()
        res.redirect('/api/tests');
    } catch (e) {
        res.status(400).render("page404", { title: "Página no encontrada" });
        console.log(e);
    }
})

router.get('/tests', async (req, res) => {
    try {
        const tests = await Test.find({})
        res.send(tests)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tests/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const test = await Test.findById(_id)

        if (!test) {
            return res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tests/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['pregunta','respuesta1', 'respuesta2','respuesta3','respuesta4']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!test) {
            return res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tests/:id', async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id)

        if (!test) {
            res.status(404).send()
        }

        res.send(test)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
