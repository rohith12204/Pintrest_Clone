<template>
  <div class="side-nav">
    <!-- Navigation Buttons -->
    <router-link to="/" title="Logo">
      <button class="icon-btn logo-btn">
        <img src="/logo.png" alt="Logo" class="logo" />
      </button>
    </router-link>

    <router-link to="/" title="Home">
      <button class="icon-btn">
        <span class="material-symbols-outlined">home</span>
      </button>
    </router-link>

    <router-link to="/create" title="Create">
      <button class="icon-btn">
        <span class="material-symbols-outlined">add_box</span>
      </button>
    </router-link>

    <router-link to="/notifications" title="Notifications">
      <button class="icon-btn">
        <span class="material-symbols-outlined">notifications</span>
      </button>
    </router-link>

    <router-link to="/messages" title="Messages">
      <button class="icon-btn">
        <span class="material-symbols-outlined">sms</span>
      </button>
    </router-link>

    <!-- Settings Button -->
    <div class="bottom-section">
      <button class="icon-btn" @click="showSettings = true" title="Settings">
        <span class="material-symbols-outlined">settings</span>
      </button>
    </div>

    <!-- ✅ Slide-out Settings Panel with Close Button -->
    <div v-if="showSettings" class="overlay" @click.self="showSettings = false">
      <div class="panel">
        <div class="panel-header">
          <h2 class="panel-title">Settings</h2>
          <button class="close-btn" @click="showSettings = false">✕</button>
        </div>

        <button
          class="panel-item"
          v-for="(item, index) in settingsItems"
          :key="index"
          @click="handleClick(item.text)"
        >
          {{ item.text }}
          <span v-if="item.hasIcon" class="external-icon">↗</span>
        </button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SideNav',
  setup() {
    const showSettings = ref(false)
    const settingsItems = [
      { text: "Home feed tuner" },
      { text: "Link Instagram & external accounts" },
      { text: "Claimed external accounts" },
      { text: "Install the Windows app" },
      { text: "Reports & violations center" },
      { text: "Your privacy rights" },
      { text: "Help center", hasIcon: true },
      { text: "Terms of service", hasIcon: true },
      { text: "Privacy policy", hasIcon: true },
      { text: "Be a beta tester", hasIcon: true }
    ]
    const handleClick = (text: string) => {
      alert(`Clicked: ${text}`)
    }

    return {
      showSettings,
      settingsItems,
      handleClick
    }
  }
})
</script>


<style scoped>
/* existing styles unchanged */
.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 72px;
  height: 100%;
  background: white;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  box-sizing: border-box;
  z-index: 1000;
}

/* Icon Buttons */
.icon-btn {
  background: none;
  border: none;
  margin: 8px 0;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background 0.2s, transform 0.2s;
}
.icon-btn:hover {
  background: #f0f0f0;
  transform: scale(1.15);
}

.logo-btn {
  margin-bottom: 20px;
}
.logo {
  width: 24px;
  height: 24px;
}
.material-symbols-outlined {
  font-size: 24px;
  color: #555;
}
.bottom-section {
  margin-top: auto;
  margin-bottom: 12px;
}

/* Settings Overlay and Panel */
.overlay {
  position: fixed;
  top: 80px;
  left: 80px;
  background: transparent;
  z-index: 9999;
}

.panel {
  background: white;
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Header with Close Button */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}
.close-btn:hover {
  background: #f0f0f0;
}

/* Settings Items */
.panel-item {
  background: none;
  border: none;
  text-align: left;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}
.panel-item:hover {
  background: #f0f0f0;
}

.external-icon {
  float: right;
  font-size: 14px;
}
</style>
