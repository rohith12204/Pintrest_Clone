<template>
  <div 
    class="card-container" 
    @mouseover="hover = true" 
    @mouseleave="hover = false"
  >
    <img :src="src" alt="" class="card-image" />

    <div v-if="hover" class="overlay">
      <div class="overlay-content">
        <div class="overlay-top">
          <button type="button" class="board-btn">
            <p>{{ board }}</p>
            <span class="material-symbols-outlined">expand_more</span>
          </button>
          <button type="button" class="save-btn">
            Save
          </button>
        </div>
        <div class="overlay-bottom">
          <div class="icon-tooltip">
            <button type="button" class="circle-icon-btn" @click="toggleShare">
              <span class="material-symbols-outlined">share</span>
            </button>
            <div class="tooltip-text">Share</div>
          </div>
          <div class="icon-tooltip">
            <a :href="src" :download="fileName" class="circle-icon-btn">
              <span class="material-symbols-outlined">download</span>
            </a>
            <div class="tooltip-text">Download</div>
          </div>
        </div>
      </div>

      <!-- Share popup -->
      <div v-if="showShare" class="share-popup">
        <a :href="`https://wa.me/?text=${shareUrl}`" target="_blank">WhatsApp</a>
        <a :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`" target="_blank">Facebook</a>
        <a :href="`https://twitter.com/intent/tweet?url=${shareUrl}`" target="_blank">X</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card',
  props: {
    src: String,
    board: String
  },
  data() {
    return {
      hover: false,
      showShare: false
    }
  },
  computed: {
    fileName(): string {
      return this.src?.split('/').pop() || 'image.jpg'
    },
    shareUrl(): string {
      // your site url to share (can be dynamic)
      return `http://localhost:5173/${this.src}`
    }
  },
  methods: {
    toggleShare() {
      this.showShare = !this.showShare
    }
  }
})
</script>

<style scoped>
.card-container {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.card-image {
  width: 100%;
  display: block;
  border-radius: 8px;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.overlay-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
}
.overlay-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.board-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  background: transparent;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
.save-btn {
  background: #e60023;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
}
.overlay-bottom {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.circle-icon-btn {
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  cursor: pointer;
  transition: opacity 0.2s;
}
.circle-icon-btn:hover {
  opacity: 1;
}
.circle-icon-btn span {
  font-size: 20px;
  color: #333;
}

/* Tooltip hover effect */
.icon-tooltip {
  position: relative;
  display: flex;
  align-items: center;
}
.tooltip-text {
  position: absolute;
  right: 40px;
  background: white;
  color: #333;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  transform: translateX(5px);
}
.icon-tooltip:hover .tooltip-text {
  opacity: 1;
  transform: translateX(0);
}

/* Share popup styles */
.share-popup {
  position: absolute;
  bottom: 40px;
  right: 12px;
  background: white;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
}
.share-popup a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
}
</style>
