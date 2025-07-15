// models/UserProfile.ts

import mongoose from 'mongoose'

// Define the schema
const UserProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
}, { timestamps: true })

// ✅ Correct export statement
const UserProfile = mongoose.model('UserProfile', UserProfileSchema)
export default UserProfile
