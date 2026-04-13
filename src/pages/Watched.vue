<template>
  <div class="watched">
    <h1>Watched Anime</h1>

    <!-- Stats -->
    <div class="stats">
      <p>Total Watched: {{ watched.length }}</p>
      <p>Average Rating: {{ averageRating }}</p>
      <p>Total Episodes: {{ totalEpisodes }}</p>
    </div>

    <!-- Empty State -->
    <div v-if="watched.length === 0">
      <p>No watched anime yet.</p>
    </div>

    <!-- List -->
    <div v-for="anime in watched" :key="anime.id" class="card">
      <h2>{{ anime.title }}</h2>
      <p><strong>Genre:</strong> {{ anime.genre }}</p>

      <!-- Rating -->
      <div class="rating">
        <span
          v-for="n in 10"
          :key="n"
          @click="rateAnime(anime.id, n)"
          :class="{ active: anime.rating >= n }"
        >
          ★
        </span>
      </div>

      <p v-if="anime.rating">Rating: {{ anime.rating }}/10</p>

      <button class="delete" @click="deleteAnime(anime.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const watched = ref([])

// Load watched anime
onMounted(() => {
  watched.value = JSON.parse(localStorage.getItem('watched')) || []
})

// ⭐ Rate anime
const rateAnime = (id, rating) => {
  const anime = watched.value.find(a => a.id === id)
  if (anime) {
    anime.rating = rating
    localStorage.setItem('watched', JSON.stringify(watched.value))
  }
}

// ❌ Delete anime
const deleteAnime = (id) => {
  watched.value = watched.value.filter(a => a.id !== id)
  localStorage.setItem('watched', JSON.stringify(watched.value))
}

// 📊 Stats
const averageRating = computed(() => {
  if (watched.value.length === 0) return 0
  const total = watched.value.reduce((sum, a) => sum + (a.rating || 0), 0)
  return (total / watched.value.length).toFixed(1)
})

const totalEpisodes = computed(() => {
  return watched.value.reduce((sum, a) => sum + a.episodes, 0)
})
</script>

<style scoped>
.watched {
  background: #0F0F1A;
  min-height: 100vh;
  color: white;
  padding: 40px;
  text-align: center;
  padding-top: 80px;
}

.stats {
  margin-bottom: 20px;
}

.card {
  background: #1A1A30;
  padding: 20px;
  margin: 15px auto;
  border-radius: 12px;
  max-width: 400px;
  text-align: left;
}

.rating {
  margin: 10px 0;
  font-size: 20px;
}

.rating span {
  cursor: pointer;
  color: gray;
}

.rating .active {
  color: gold;
}

.delete {
  background: red;
  padding: 8px 12px;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
}
</style>