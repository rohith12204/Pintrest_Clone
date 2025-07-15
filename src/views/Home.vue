<template>
  <div>
    <SideNav />
    <div class="main-content">
      <TopNav />
      <div class="masonry-container">
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="masonry-item"
        >
          <router-link
            :to="{ name: 'Image', query: { id: i + 1 } }"
            class="card-link"
          >
            <Card :src="card.src" :board="card.recommended" />
            <!-- Removed card-text block -->
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import TopNav from '../components/TopNav.vue'
import SideNav from '../components/SideNav.vue'
import Card from '../components/Card.vue'

interface CardItem {
  src: string
  title: string
  user: string
  recommended: string
}

export default defineComponent({
  name: 'Home',
  components: {
    TopNav,
    SideNav,
    Card
  },
  data() {
    return {
      cards: [
        { src: '1.jpg', user: 'User 1', recommended: 'Travel' },
        { src: '2.jpg', title: 'Title 2', user: 'User 2', recommended: 'Travel' },
        { src: '3.jpg', title: 'Title 3', user: 'User 3', recommended: 'Travel' },
        { src: '4.jpg', title: 'Title 4', user: 'User 4', recommended: 'Travel' },
        { src: '5.jpg', title: 'Title 5', user: 'User 5', recommended: 'Travel' },
        { src: '6.jpg', title: 'Title 6', user: 'User 6', recommended: 'Travel' },
        { src: '7.jpg', title: 'Title 7', user: 'User 7', recommended: 'Travel' },
        { src: '8.jpg', title: 'Title 8', user: 'User 8', recommended: 'Travel' },
        { src: '9.jpg', title: 'Title 9', user: 'User 9', recommended: 'Travel' },
        { src: '10.jpg', title: 'Title 10', user: 'User 10', recommended: 'Travel' },
        { src: '11.jpg', title: 'Title 11', user: 'User 11', recommended: 'Travel' },
        { src: '12.jpg', title: 'Title 12', user: 'User 12', recommended: 'Travel' },
        { src: '13.jpg', title: 'Title 13', user: 'User 13', recommended: 'Travel' },
        { src: '14.jpg', title: 'Title 14', user: 'User 14', recommended: 'Travel' },
        { src: '15.jpg', title: 'Title 15', user: 'User 15', recommended: 'Travel' },
        { src: '16.jpg', title: 'Title 16', user: 'User 16', recommended: 'Travel' },
        { src: '17.jpg', title: 'Title 17', user: 'User 17', recommended: 'Travel' },
        { src: '18.jpg', title: 'Title 18', user: 'User 18', recommended: 'Travel' },
        { src: '19.jpg', title: 'Title 19', user: 'User 19', recommended: 'Travel' },
        { src: '20.jpg', title: 'Title 20', user: 'User 20', recommended: 'Travel' },
        { src: '21.jpg', title: 'Title 21', user: 'User 21', recommended: 'Travel' },
        { src: '22.jpg', title: 'Title 22', user: 'User 22', recommended: 'Travel' },
        { src: '23.jpg', title: 'Title 23', user: 'User 23', recommended: 'Travel' }
      ] as CardItem[]
    }
  }
})
</script>

<style scoped>
.main-content {
  margin-left: 72px;
}
.masonry-container {
  column-count: 5;
  column-gap: 20px;
  padding: 20px;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
}
.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}
.card-text {
  padding-top: 8px;
}
.card-title {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.2;
}
.card-user {
  font-size: 12px;
  color: #666;
}

@media (max-width: 1200px) { .masonry-container { column-count: 4; } }
@media (max-width: 900px) { .masonry-container { column-count: 3; } }
@media (max-width: 600px) { .masonry-container { column-count: 2; } }
</style>
