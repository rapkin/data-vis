import tokens from '../models/tokens'
import users from '../models/users'
import { Router } from 'express'

const router = Router()

router.get('/info/', async (req, res) => {
    res.status(501).send()
})

router.post('/login/', async (req, res) => {
    res.status(501).send()
})

router.post('/registration/', async (req, res) => {
    // const saved = await users.save(req.body)
    // res.send(saved)
    res.status(501).send()
})

router.get('/logout/', async (req, res) => {
    res.status(501).send()
})

export default router
