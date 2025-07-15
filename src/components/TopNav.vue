<template>
  <div class="topnav">
    <div class="left-section">
      <button
        v-for="(item, i) in tabItems"
        :key="i"
        @click="selectedTab = item.key"
        :class="['tab-btn', selectedTab === item.key ? 'tab-btn-active' : '']"
      >
        {{ item.name }}
      </button>
    </div>

    <div class="search-container">
      <span class="material-icons search-icon"></span>
      <input type="text" class="search-input" placeholder="Search" />
    </div>

    <div class="right-section">
      <router-link to="/profile" class="circle-btn">
        <div class="profile-pic" style="background-image: url(/profile.JPG)"></div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TopNav',
  data() {
    return {
      tabItems: [
        { name: 'Home', key: 'home' },
        { name: 'Today', key: 'today' }
      ],
      selectedTab: 'home'
    }
  }
});
</script>

<style scoped>
/* your existing styles unchanged */
.topnav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.circle-btn {
  border: none;
  background: transparent;
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
}
.circle-btn:hover {
  background: #f0f0f0;
}

.tab-btn {
  border: none;
  background: transparent;
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.tab-btn:hover {
  background: #f0f0f0;
}
.tab-btn-active {
  background: #333;
  color: white;
}

.search-container {
  flex-grow: 1;
  position: relative;
  margin: 0 16px;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #999;
}
.search-input {
  width: 95%;
  padding: 8px 12px 8px 36px;
  border-radius: 20px;
  border: none;
  background: #f5f5f5;
  color: #555;
}
.search-input:focus {
  outline: none;
  background: #eee;
}

.profile-pic {
  width: 37px;
  height: 37px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
</style>
