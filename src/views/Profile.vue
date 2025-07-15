<template>
  <div>
    <TopNav />

    <div class="main-content-layout">
      <!-- Left: Saved Ideas Section -->
      <div class="saved-ideas-container">
        <h1 class="section-title">Your saved ideas</h1>

        <!-- Tabs: Pins / Boards -->
        <div class="tabs">
          <span :class="{ active: activeTab === 'pins' }" @click="activeTab = 'pins'">
            <span class="material-icons">image</span> Pins
          </span>
          <span :class="{ active: activeTab === 'boards' }" @click="activeTab = 'boards'">
            <span class="material-icons">dashboard</span> Boards
          </span>
        </div>

        <!-- Boards tab content -->
        <div v-if="activeTab === 'boards'" class="boards-section">
          <div class="boards-actions">
            <button class="group-btn"><span class="material-icons">tune</span> Group</button>
            <button class="create-board-btn">Create a board</button>
          </div>
          <div class="unorganized">
            <h3>Unorganized ideas</h3>
            <div class="pins-grid">
              <div v-for="(pin, i) in savedStore.savedPins" :key="i" class="pin-card">
                <img :src="pin.src" :alt="pin.title" />
              </div>
            </div>
            <button class="organize-btn">Organize</button>
          </div>
        </div>

        <!-- Pins tab content -->
        <div v-else class="pins-grid">
          <div
            v-for="(pin, i) in savedStore.savedPins"
            :key="pin.id"
            class="pin-card hover-container"
          >
            <img :src="pin.src" :alt="pin.title" />
            <button class="remove-btn" @click="removePin(i)">
              <span class="material-icons">remove</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Profile info section -->
      <div class="profile-header">
        <img class="avatar" src="/profile.JPG" alt="Profile" />
        <div class="profile-info">
          <h2>Rohith P</h2>
          <p>0 following</p>
          <button class="profile-btn">View profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useSavedStore } from '../stores/savedStore'
import TopNav from '../components/TopNav.vue'

export default defineComponent({
  components: { TopNav },
  setup() {
    const savedStore = useSavedStore()
    const activeTab = ref('pins')

    // Load pins from backend
    onMounted(() => {
      savedStore.loadSavedPinsFromBackend()
    })

    // Remove pin by index
    const removePin = async (index: number) => {
      await savedStore.removePin(index)
    }

    return {
      activeTab,
      savedStore,
      removePin
    }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.main-content-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
  gap: 40px;
  padding-left: 70px;
}

.saved-ideas-container {
  flex: 1;
}

.profile-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  min-width: 180px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 30px;
}

.profile-info h2 {
  margin: 0;
  font-size: 16px;
  text-align: center;
  flex-direction: column;
}

.profile-info p {
  margin: 4px 0;
  font-size: 14px;
  text-align: center;
}

.profile-btn {
  background: #efefef;
  border: none;
  padding: 4px 8px;            
  border-radius: 12px;
  cursor: pointer;
  font-size: 10px;             
  white-space: nowrap;         
}


.section-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.tabs span {
  cursor: pointer;
  padding: 6px 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: border-bottom 0.3s ease;
}
.tabs .active {
  border-bottom: 2px solid black;
}

.boards-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.group-btn,
.organize-btn {
  background: #efefef;
  border: none;
  padding: 6px 12px;
  border-radius: 12px;
  cursor: pointer;
}

.create-board-btn {
  background: #e60023;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.unorganized {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.pin-card img {
  width: 100%;
  border-radius: 12px;
  transition: transform 0.2s;
}
.pin-card img:hover {
  transform: scale(1.05);
}

.hover-container {
  position: relative;
}

.remove-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #e60023;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s;
}
.hover-container:hover .remove-btn {
  opacity: 1;
}
.remove-btn .material-icons {
  font-size: 18px;
}

.topnav {
  padding-left: 60px;
}

</style>
