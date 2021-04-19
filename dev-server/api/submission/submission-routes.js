import express from 'express'
import * as controller from './submission-controller'

const router = express.Router()

router.post('/user_submit', controller.userSubmit)
router.get('/user_submissions/:id', controller.userSubmissions)
router.get('/submissions_to_process', controller.submissionsToProcess)
router.put('/process/:id', controller.process)

export default router