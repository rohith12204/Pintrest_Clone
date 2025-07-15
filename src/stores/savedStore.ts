import { defineStore } from 'pinia'
import axios from 'axios'

// 📦 Shape of a pin returned from MongoDB backend
interface PinFromBackend {
  _id: string
  name: string
  imageUrl: string
}

// 📦 Internal pin structure in Pinia
export interface SavedPin {
  id: string
  src: string
  title: string
  user: string
}

export const useSavedStore = defineStore('saved', {
  state: () => ({
    savedPins: [] as SavedPin[]
  }),

  actions: {
    /**
     * 🧠 Save a pin to the Pinia store
     */
    savePin(pin: SavedPin) {
      console.log('📌 Saving pin to Pinia:', pin)
      this.savedPins.push(pin)
    },

    /**
     * 📥 Load all pins from backend
     */
    async loadSavedPinsFromBackend() {
      try {
        const res = await axios.get<PinFromBackend[]>('http://localhost:5000/api/profile/all')

        this.savedPins = res.data.map(item => ({
          id: item._id,
          src: item.imageUrl,
          title: item.name,
          user: item.name // You can modify this if backend adds a real `user` field later
        }))

        console.log('📂 Loaded pins from backend:', this.savedPins)
      } catch (err) {
        console.error('❌ Failed to load saved pins from backend:', err)
      }
    },

    /**
     * ❌ Delete pin from backend and local state using index
     */
    async removePin(index: number) {
      const pin = this.savedPins[index]

      if (!pin || !pin.id) {
        console.warn('⚠️ No valid pin or missing ID to delete')
        return
      }

      console.log('🗑 Deleting pin:', pin)

      try {
        await axios.delete(`http://localhost:5000/api/profile/${pin.id}`)
        this.savedPins.splice(index, 1)
        console.log('✅ Pin deleted. Remaining:', this.savedPins)
      } catch (err) {
        console.error('❌ Failed to delete pin from backend:', err)
      }
    }
  }
})
