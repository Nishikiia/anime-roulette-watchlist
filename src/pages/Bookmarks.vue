<template>
  <main class="page bookmarks">
    <section class="page-header">
      <p class="eyebrow">Plan to Watch</p>
      <h1>Bookmarks</h1>
      <p class="intro">Manage saved anime before moving them into the completed library.</p>
    </section>

    <section class="toolbar panel">
      <strong>{{ filteredBookmarks.length }} of {{ bookmarks.length }} shown</strong>
      <input v-model="searchTerm" type="search" placeholder="Search by title or genre" />
      <select v-model="genreFilter">
        <option value="All">All genres</option>
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>
    </section>

    <section v-if="bookmarks.length === 0" class="empty-state">
      <h2>No bookmarks yet</h2>
      <p>Use the Generator page to save titles into your Plan to Watch list.</p>
      <router-link to="/generator" class="link-button">Start Discovering</router-link>
    </section>

    <section v-else-if="filteredBookmarks.length === 0" class="empty-state">
      <h2>No matching bookmarks</h2>
      <p>Clear the search or change the genre filter.</p>
    </section>

    <section v-else class="card-grid">
      <article v-for="anime in filteredBookmarks" :key="anime.id" class="anime-card">
        <div class="card-top">
          <span class="genre-pill">{{ anime.genre }}</span>
          <span class="score">★ {{ anime.score }}</span>
        </div>
        <h2>{{ anime.title }}</h2>
        <p class="meta">{{ anime.episodes }} episode{{ anime.episodes === 1 ? '' : 's' }}</p>
        <p>{{ anime.synopsis }}</p>
        <div class="actions">
          <button @click="moveToWatched(anime)">Mark as Watched</button>
          <button class="delete" @click="removeAnime(anime.id)">Remove</button>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { genres } from '../data/anime'

const bookmarks = ref([])
const searchTerm = ref('')
const genreFilter = ref('All')

onMounted(() => {
  bookmarks.value = JSON.parse(localStorage.getItem('bookmarks')) || []
})

const persistBookmarks = () => localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))

const filteredBookmarks = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  return bookmarks.value.filter((anime) => {
    const matchesSearch = !term || anime.title.toLowerCase().includes(term) || anime.genre.toLowerCase().includes(term)
    const matchesGenre = genreFilter.value === 'All' || anime.genre === genreFilter.value
    return matchesSearch && matchesGenre
  })
})

const removeAnime = (id) => {
  bookmarks.value = bookmarks.value.filter((anime) => anime.id !== id)
  persistBookmarks()
}

const moveToWatched = (anime) => {
  removeAnime(anime.id)
  const watched = JSON.parse(localStorage.getItem('watched')) || []
  const exists = watched.some((item) => item.id === anime.id)
  if (!exists) {
    watched.push({ ...anime, status: 'watched', rating: anime.rating || null, notes: anime.notes || '' })
    localStorage.setItem('watched', JSON.stringify(watched))
  }
}
</script>

<style scoped>
.toolbar { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
input, select { padding: 11px 12px; border-radius: 10px; border: 1px solid #343459; background: #111122; color: white; min-width: 210px; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; max-width: 1000px; margin: 0 auto; }
.anime-card, .empty-state { background: #1A1A30; border: 1px solid #2d2d4d; border-radius: 18px; padding: 20px; text-align: left; }
.empty-state { max-width: 680px; margin: 0 auto; text-align: center; }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.genre-pill { background: rgba(255,107,53,.15); color: #ffb199; padding: 6px 10px; border-radius: 999px; font-size: 13px; }
.score { color: #ffd166; font-weight: 700; }
.meta { color: #a7a7bd; margin: 8px 0; }
.actions { margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap; }
button, .link-button { padding: 10px 14px; background: #6C3CE1; color: white; border: none; border-radius: 10px; cursor: pointer; text-decoration: none; font-weight: 700; display: inline-block; }
button:hover, .link-button:hover { background: #FF6B35; }
.delete { background: #b82f4b; }
</style>
