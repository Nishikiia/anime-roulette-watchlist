<template>
  <main class="page watched">
    <section class="page-header">
      <p class="eyebrow">Completed Library</p>
      <h1>Watched Anime</h1>
      <p class="intro">Rate completed titles, filter your history, and store short personal review notes.</p>
    </section>

    <section class="stats-grid">
      <div class="stat"><span>{{ watched.length }}</span><p>Total Watched</p></div>
      <div class="stat"><span>{{ averageRating }}</span><p>Average Rating</p></div>
      <div class="stat"><span>{{ totalEpisodes }}</span><p>Total Episodes</p></div>
    </section>

    <section class="toolbar panel">
      <input v-model="searchTerm" type="search" placeholder="Search completed anime" />
      <select v-model="ratingFilter">
        <option value="All">All ratings</option>
        <option value="rated">Rated only</option>
        <option value="unrated">Unrated only</option>
        <option value="8plus">8+ rating</option>
      </select>
    </section>

    <section v-if="watched.length === 0" class="empty-state">
      <h2>No watched anime yet</h2>
      <p>Move titles from Bookmarks after watching them.</p>
    </section>

    <section v-else-if="filteredWatched.length === 0" class="empty-state">
      <h2>No matching watched titles</h2>
      <p>Adjust your search or rating filter.</p>
    </section>

    <section v-else class="card-grid">
      <article v-for="anime in filteredWatched" :key="anime.id" class="anime-card">
        <div class="card-top">
          <span class="genre-pill">{{ anime.genre }}</span>
          <span class="score">{{ anime.rating ? anime.rating + '/10' : 'Unrated' }}</span>
        </div>
        <h2>{{ anime.title }}</h2>
        <p class="meta">{{ anime.episodes }} episode{{ anime.episodes === 1 ? '' : 's' }}</p>

        <div class="rating" aria-label="Rating from 1 to 10">
          <button
            v-for="n in 10"
            :key="n"
            @click="rateAnime(anime.id, n)"
            :class="{ active: anime.rating >= n }"
            :title="`Rate ${n}/10`"
          >★</button>
        </div>

        <label class="notes-label" :for="`notes-${anime.id}`">Personal review notes</label>
        <textarea
          :id="`notes-${anime.id}`"
          :value="anime.notes"
          @input="updateNotes(anime.id, $event.target.value)"
          placeholder="Write a short note about this anime..."
        />

        <button class="delete" @click="deleteAnime(anime.id)">Delete</button>
      </article>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const watched = ref([])
const searchTerm = ref('')
const ratingFilter = ref('All')

onMounted(() => {
  watched.value = (JSON.parse(localStorage.getItem('watched')) || []).map((anime) => ({ notes: '', ...anime }))
})

const persistWatched = () => localStorage.setItem('watched', JSON.stringify(watched.value))

const filteredWatched = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  return watched.value.filter((anime) => {
    const matchesSearch = !term || anime.title.toLowerCase().includes(term) || anime.genre.toLowerCase().includes(term)
    const matchesRating =
      ratingFilter.value === 'All' ||
      (ratingFilter.value === 'rated' && anime.rating) ||
      (ratingFilter.value === 'unrated' && !anime.rating) ||
      (ratingFilter.value === '8plus' && anime.rating >= 8)
    return matchesSearch && matchesRating
  })
})

const rateAnime = (id, rating) => {
  const anime = watched.value.find((item) => item.id === id)
  if (anime) {
    anime.rating = rating
    persistWatched()
  }
}

const updateNotes = (id, notes) => {
  const anime = watched.value.find((item) => item.id === id)
  if (anime) {
    anime.notes = notes
    persistWatched()
  }
}

const deleteAnime = (id) => {
  watched.value = watched.value.filter((anime) => anime.id !== id)
  persistWatched()
}

const averageRating = computed(() => {
  const rated = watched.value.filter((anime) => anime.rating)
  if (!rated.length) return '0.0'
  const total = rated.reduce((sum, anime) => sum + Number(anime.rating), 0)
  return (total / rated.length).toFixed(1)
})

const totalEpisodes = computed(() => watched.value.reduce((sum, anime) => sum + Number(anime.episodes || 0), 0))
</script>

<style scoped>
.stats-grid { display: grid; grid-template-columns: repeat(3, minmax(150px, 1fr)); gap: 14px; max-width: 900px; margin: 0 auto 22px; }
.stat, .toolbar, .anime-card, .empty-state { background: #1A1A30; border: 1px solid #2d2d4d; border-radius: 18px; padding: 18px; }
.stat span { display: block; font-size: 32px; color: #FF6B35; font-weight: 800; }
.stat p { color: #c9c9d8; }
.toolbar { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin: 0 auto 24px; max-width: 900px; }
input, select, textarea { padding: 11px 12px; border-radius: 10px; border: 1px solid #343459; background: #111122; color: white; }
input, select { min-width: 220px; }
textarea { width: 100%; min-height: 82px; resize: vertical; box-sizing: border-box; margin-top: 8px; }
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; max-width: 1000px; margin: 0 auto; }
.empty-state { max-width: 680px; margin: 0 auto; text-align: center; }
.anime-card { text-align: left; }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.genre-pill { background: rgba(255,107,53,.15); color: #ffb199; padding: 6px 10px; border-radius: 999px; font-size: 13px; }
.score { color: #ffd166; font-weight: 700; }
.meta { color: #a7a7bd; margin: 8px 0 12px; }
.rating { display: flex; flex-wrap: wrap; gap: 2px; margin: 12px 0; }
.rating button { background: transparent; border: none; color: #5b5b73; font-size: 19px; cursor: pointer; padding: 2px; }
.rating button.active { color: #ffd166; }
.notes-label { display: block; margin-top: 12px; color: #c9c9d8; font-weight: 700; }
.delete { margin-top: 12px; padding: 10px 14px; background: #b82f4b; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 700; }
@media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr; } }
</style>
