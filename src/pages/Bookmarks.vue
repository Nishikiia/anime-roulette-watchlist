<template>
  <div class="bookmarks">
    <h1>Plan to Watch</h1>

    <!-- Count -->
    <p class="count">Total: {{ bookmarks.length }}</p>

    <!-- Empty State -->
    <div v-if="bookmarks.length === 0">
      <p>No bookmarks yet. Go generate some anime!</p>
    </div>

    <!-- List -->
    <div v-for="anime in bookmarks" :key="anime.id" class="card">
      <h2>{{ anime.title }}</h2>
      <p><strong>Genre:</strong> {{ anime.genre }}</p>
      <p><strong>Episodes:</strong> {{ anime.episodes }}</p>

      <div class="actions">
        <button @click="moveToWatched(anime)">Mark as Watched</button>
        <button class="delete" @click="removeAnime(anime.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bookmarks = ref([])

// Load from localStorage
onMounted(() => {
  bookmarks.value = JSON.parse(localStorage.getItem('bookmarks')) || []
})

// Remove anime
const removeAnime = (id) => {
  bookmarks.value = bookmarks.value.filter(a => a.id !== id)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
}

// Move to watched
const moveToWatched = (anime) => {
  // remove from bookmarks
  removeAnime(anime.id)

  // add to watched
  const watched = JSON.parse(localStorage.getItem('watched')) || []
  watched.push({ ...anime, status: 'watched', rating: null })

  localStorage.setItem('watched', JSON.stringify(watched))
}
</script>

<style scoped>
.bookmarks {
  background: #0F0F1A;
  min-height: 100vh;
  color: white;
  padding: 40px;
  text-align: center;
  padding-top: 80px;
}

.count {
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

.actions {
  margin-top: 10px;
}

button {
  padding: 8px 12px;
  margin-right: 10px;
  background: #6C3CE1;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #FF6B35;
}

.delete {
  background: red;
}
</style>