import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
	res.json({ message: 'Get all users' })
})

router.get('/:id', (req, res) => {
	res.json({ message: `Get user ${req.params.id}` })
})

router.post('/', (req, res) => {
	res.status(201).json({ message: 'User created' })
})

router.delete('/:id', (req, res) => {
	res.json({ message: `Delete user ${req.params.id}` })
})

export default router