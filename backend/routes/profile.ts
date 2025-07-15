import express from 'express'
import UserProfile from '../models/UserProfile'

const router = express.Router()

// POST /api/profile
router.post('/', async (req, res) => {
  try {
    const { name, imageUrl } = req.body
    const newProfile = new UserProfile({ name, imageUrl })
    await newProfile.save()
    res.status(201).json(newProfile)
  } catch (error) {
    res.status(500).json({ error: 'Failed to save profile' })
  }
})

// GET /api/profile/all
router.get('/all', async (_req, res) => {
  try {
    const profiles = await UserProfile.find().sort({ createdAt: -1 })
    res.json(profiles)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' })
  }
})

// ✅ DELETE /api/profile/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await UserProfile.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.json({ message: 'Profile deleted successfully', deleted })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete profile' })
  }
})

export default router
