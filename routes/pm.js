import express from 'express'
import {login, signup} from '../controllers/pm/pmAPI.js'
const router= express.Router()

// log in
router.post('/pm/login',login)

// sign up
router.post('/pm/signup',signup)
export default router;