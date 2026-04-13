<template>
  <div class="generator">
    <h1>Anime Generator</h1>

    <!-- Dropdown -->
    <select v-model="selectedGenre">
      <option disabled value="">Select Genre</option>
      <option>Action</option>
      <option>Romance</option>
      <option>Isekai</option>
    </select>

    <!-- Button -->
    <button @click="generateAnime">Generate</button>

    <!-- Empty State -->
    <div v-if="!generatedAnime">
      <p>No anime generated yet. Select a genre and click generate.</p>
    </div>

    <!-- Anime Card -->
    <div v-if="generatedAnime" class="card">
      <h2>{{ generatedAnime.title }}</h2>
      <p><strong>Genre:</strong> {{ generatedAnime.genre }}</p>
      <p><strong>Episodes:</strong> {{ generatedAnime.episodes }}</p>
      <p>{{ generatedAnime.synopsis }}</p>
      <p class="score">⭐ {{ generatedAnime.score }}</p>

      <button @click="bookmarkAnime">Bookmark</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { animeList } from '../data/anime'

const selectedGenre = ref('')
const generatedAnime = ref(null)

// Generate anime
const generateAnime = () => {
  const filtered = animeList.filter(
    anime => anime.genre === selectedGenre.value
  )

  if (filtered.length > 0) {
    const randomIndex = Math.floor(Math.random() * filtered.length)
    generatedAnime.value = filtered[randomIndex]
  }
}

// ✅ Bookmark function (THIS WAS MISSING)
const bookmarkAnime = () => {
  if (!generatedAnime.value) return

  const existing = JSON.parse(localStorage.getItem('bookmarks')) || []

  // prevent duplicates
  const alreadyExists = existing.find(a => a.id === generatedAnime.value.id)

  if (!alreadyExists) {
    existing.push({ ...generatedAnime.value, status: 'bookmarked' })
    localStorage.setItem('bookmarks', JSON.stringify(existing))
    alert('Anime bookmarked!')
  } else {
    alert('Already bookmarked!')
  }
}
</script>

<style scoped>
.generator {
  background: #0F0F1A;
  min-height: 100vh;
  color: white;
  padding: 40px;
  text-align: center;
  padding-top: 80px;
}

select {
  padding: 10px;
  border-radius: 7px;
  border: none;
  margin: 10px;
}

button {
  padding: 10px 16px;
  background: #6C3CE1;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  background: #FF6B35;
}

.card {
  margin: 30px auto;
  padding: 24px;
  background: #1A1A30;
  border-radius: 12px;
  max-width: 400px;
  text-align: left;
}

.score {
  margin-top: 10px;
}
</style>