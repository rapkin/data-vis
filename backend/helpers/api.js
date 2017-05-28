import { Router } from 'express'

export default (model) => {
    const router = Router()

    router.get('/', async (req, res) => {
        try {
            const list = await model.find()
            res.send(list)
        } catch(e) {
            console.error(e)
            res.status(500).send({error: e.toString()})
        }
    })

    router.delete('/:id/', async (req, res) => {
        try {
            const _id = req.params.id
            const removed = model.remove({_id})
            console.log(removed)
            res.send(removed)
        } catch(e) {
            console.error(e)
            res.status(500).send({error: e.toString()})
        }
    })

    return router
}
