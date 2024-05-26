import { Router } from "express"

const router = Router()


/**
 * COMPANY
 */
router.get('/company', (req, res) => {
    res.status(200)
    res.json({ world: "bye" })
})
router.get('/company/:id', () => { })
router.put('/company/:id', () => { })
router.post('/company', () => { })
router.delete('/product/:id', () => { })


export default router