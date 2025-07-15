<template>
  <div class="main-content">
    <TopNav />

    <div v-if="card" class="image-page-container">
      <div class="image-side">
        <div class="image-wrapper">
          <img :src="card.src" :alt="card.title" class="image-half" />
          <button class="expand-btn" @click="openFullscreen">
            <span class="material-symbols-outlined">fullscreen</span>
          </button>
        </div>
      </div>

      <div class="details-side">
        <h2 class="image-title">{{ card.title }}</h2>
        <p class="image-user"><strong>User:</strong> {{ card.user }}</p>
        <p class="image-board"><strong>Board:</strong> {{ card.recommended }}</p>
        <div class="actions">
          <button class="save-btn" @click="savePin">Save</button>
        </div>
      </div>
    </div>

    <div v-if="isFullscreen" class="fullscreen-overlay" @click.self="closeFullscreen">
      <img :src="card.src" :style="{ transform: 'scale(' + zoomLevel + ')' }" class="fullscreen-image" />
      <div class="fullscreen-controls">
        <button @click.stop="zoomIn">+</button>
        <button @click.stop="zoomOut">-</button>
      </div>
      <button class="close-btn" @click="closeFullscreen">&times;</button>
    </div>

    <div v-else-if="!card" class="not-found">
      <p>Image not found.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import TopNav from '../components/TopNav.vue'
import { useSavedStore } from '../stores/savedStore'
import axios from 'axios'

export default defineComponent({
  components: { TopNav },
  setup() {
    const route = useRoute()
    const id = computed(() => {
      const val = Number(route.query.id)
      return isNaN(val) ? 1 : val
    })

    const isFullscreen = ref(false)
    const zoomLevel = ref(1)
    const savedStore = useSavedStore()

    const cards = [
      { src: '/1.jpg', title: 'Title 1', user: 'User 1', recommended: 'Travel' },
      { src: '/2.jpg', title: 'Title 2', user: 'User 2', recommended: 'Travel' },
      { src: '/3.jpg', title: 'Title 3', user: 'User 3', recommended: 'Travel' },
      { src: '/4.jpg', title: 'Title 4', user: 'User 4', recommended: 'Travel' },
      { src: '/5.jpg', title: 'Title 5', user: 'User 5', recommended: 'Travel' },
      { src: '/6.jpg', title: 'Title 6', user: 'User 6', recommended: 'Travel' },
      { src: '/7.jpg', title: 'Title 7', user: 'User 7', recommended: 'Travel' },
      { src: '/8.jpg', title: 'Title 8', user: 'User 8', recommended: 'Travel' },
      { src: '/9.jpg', title: 'Title 9', user: 'User 9', recommended: 'Travel' },
      { src: '/10.jpg', title: 'Title 10', user: 'User 10', recommended: 'Travel' },
      { src: '/11.jpg', title: 'Title 11', user: 'User 11', recommended: 'Travel' },
      { src: '/12.jpg', title: 'Title 12', user: 'User 12', recommended: 'Travel' },
      { src: '/13.jpg', title: 'Title 13', user: 'User 13', recommended: 'Travel' },
      { src: '/14.jpg', title: 'Title 14', user: 'User 14', recommended: 'Travel' },
      { src: '/15.jpg', title: 'Title 15', user: 'User 15', recommended: 'Travel' },
      { src: '/16.jpg', title: 'Title 16', user: 'User 16', recommended: 'Travel' },
      { src: '/17.jpg', title: 'Title 17', user: 'User 17', recommended: 'Travel' },
      { src: '/18.jpg', title: 'Title 18', user: 'User 18', recommended: 'Travel' },
      { src: '/19.jpg', title: 'Title 19', user: 'User 19', recommended: 'Travel' },
      { src: '/20.jpg', title: 'Title 20', user: 'User 20', recommended: 'Travel' },
      { src: '/21.jpg', title: 'Title 21', user: 'User 21', recommended: 'Travel' },
      { src: '/22.jpg', title: 'Title 22', user: 'User 22', recommended: 'Travel' },
      { src: '/23.jpg', title: 'Title 23', user: 'User 23', recommended: 'Travel' }
    ]

    const card = computed(() => cards[id.value - 1] || null)

    const openFullscreen = () => {
      isFullscreen.value = true
      zoomLevel.value = 1
    }

    const closeFullscreen = () => {
      isFullscreen.value = false
    }

    const zoomIn = () => {
      zoomLevel.value = Math.min(zoomLevel.value + 0.2, 3)
    }

    const zoomOut = () => {
      zoomLevel.value = Math.max(zoomLevel.value - 0.2, 0.5)
    }

    const savePin = async () => {
      if (!card.value) return

      try {
        const response = await axios.post('http://localhost:5000/api/profile', {
          name: card.value.title,
          imageUrl: card.value.src
        })

        const saved = response.data as { _id: string; name: string; imageUrl: string }
        console.log('✅ Saved to backend:', saved)

        savedStore.savePin({
          id: saved._id,
          src: saved.imageUrl,
          title: saved.name,
          user: saved.name
        })

        alert('✅ Image saved to MongoDB and Pinia!')
      } catch (error) {
        console.error('❌ Error saving to backend:', error)
        alert('❌ Failed to save image.')
      }
    }

    watch(isFullscreen, (val) => {
      document.body.style.overflow = val ? 'hidden' : ''
    })

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullscreen()
      if (isFullscreen.value && (e.key === '+' || e.key === '=')) zoomIn()
      if (isFullscreen.value && e.key === '-') zoomOut()
    }

    onMounted(() => window.addEventListener('keydown', handleKey))
    onUnmounted(() => window.removeEventListener('keydown', handleKey))

    return {
      card,
      isFullscreen,
      zoomLevel,
      openFullscreen,
      closeFullscreen,
      zoomIn,
      zoomOut,
      savePin
    }
  }
})
</script>


<style scoped>
.main-content {
  margin-left: 72px;
  padding: 15px;
}

.image-page-container {
  display: flex;
  align-items: flex-start;
  gap: 50px;
   margin-top: 35px;
}

.image-side {
  flex: 1;
  max-width: 25%; /* adjust as needed */
}

.image-wrapper {
  position: relative;
}

.image-half {
  width: 100%;
  border-radius: 12px;
}

.expand-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.details-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-title {
  font-size: 24px;
  font-weight: bold;
}

.image-user,
.image-board {
  font-size: 16px;
  color: #555;
}

.actions {
  margin-top: 20px;
}

.save-btn {
  background: #e60023;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;
}

.save-btn:hover {
  background: #ad081b;
}

/* Fullscreen overlay */
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.fullscreen-image {
  max-width: 70%; /* adjust as needed */
  max-height: 80%;
  transition: transform 0.3s ease;
}

.fullscreen-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
}

.fullscreen-controls button {
  background: white;
  border: none;
  font-size: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
}

.close-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: white;
  color: black;
  border: none;
  font-size: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
