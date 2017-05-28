import { Router } from 'express'
import dataEntries from './dataEntries'
import dataSets from './dataSets'
import locations from './locations'
import auth from './auth'

const router = Router()
export default router

router.use('/dataEntries/', dataEntries)
router.use('/dataSets/', dataSets)
router.use('/locations/', locations)
router.use('/auth/', auth)
