<template>
  <main class="page generator">
    <section class="page-header">
      <p class="eyebrow">Discovery Engine</p>
      <h1>Find your next anime</h1>
      <p class="intro">Select a genre and AniMinded will recommend one title from the local anime dataset.</p>
    </section>

    <section class="panel controls">
      <label for="genre">Choose a genre</label>
      <div class="control-row">
        <select id="genre" v-model="selectedGenre">
          <option disabled value="">Select genre</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
        <button @click="generateAnime" :disabled="!selectedGenre">Generate</button>
      </div>
      <p class="helper">Dataset size: {{ animeList.length }} curated titles across {{ genres.length }} genres.</p>
    </section>

    <section v-if="!generatedAnime" class="empty-state">
      <h2>No anime generated yet</h2>
      <p>Pick a genre above to start the MVP discovery workflow.</p>
    </section>

    <section v-else class="anime-card">
      <div class="card-top">
        <span class="genre-pill">{{ generatedAnime.genre }}</span>
        <span class="score">★ {{ generatedAnime.score }}</span>
      </div>
      <h2>{{ generatedAnime.title }}</h2>
      <p class="meta">{{ generatedAnime.episodes }} episode{{ generatedAnime.episodes === 1 ? '' : 's' }}</p>
      <p class="synopsis">{{ generatedAnime.synopsis }}</p>
      <button @click="bookmarkAnime">{{ isAlreadySaved ? 'Already Saved' : 'Bookmark This' }}</button>
      <p class="success" v-if="message">{{ message }}</p>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { animeList, genres } from '../data/anime'

const selectedGenre = ref('')
const generatedAnime = ref(null)
const message = ref('')

const getBookmarks = () => JSON.parse(localStorage.getItem('bookmarks')) || []

const isAlreadySaved = computed(() => {
  if (!generatedAnime.value) return false
  return getBookmarks().some((anime) => anime.id === generatedAnime.value.id)
})

const generateAnime = () => {
  const filtered = animeList.filter((anime) => anime.genre === selectedGenre.value)
  if (!filtered.length) return
  const randomIndex = Math.floor(Math.random() * filtered.length)
  generatedAnime.value = filtered[randomIndex]
  message.value = ''
}

const bookmarkAnime = () => {
  if (!generatedAnime.value) return
  const bookmarks = getBookmarks()
  const watched = JSON.parse(localStorage.getItem('watched')) || []
  const exists = [...bookmarks, ...watched].some((anime) => anime.id === generatedAnime.value.id)

  if (exists) {
    message.value = 'This anime is already in your library.'
    return
  }

  bookmarks.push({ ...generatedAnime.value, status: 'bookmarked', rating: null, notes: '' })
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  message.value = 'Saved to Plan to Watch.'
}
</script>

<style scoped>
.generator { display: grid; gap: 24px; }
.controls { max-width: 760px; margin: 0 auto; text-align: left; }
label { display: block; margin-bottom: 10px; font-weight: 700; }
.control-row { display: flex; gap: 12px; flex-wrap: wrap; }
select { flex: 1; min-width: 220px; padding: 12px; border-radius: 10px; border: 1px solid #343459; background: #111122; color: white; }
button { padding: 12px 18px; background: #6C3CE1; color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: 700; }
button:hover:not(:disabled) { background: #FF6B35; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.helper, .meta { color: #a7a7bd; margin-top: 10px; }
.anime-card, .empty-state { background: #1A1A30; border: 1px solid #2d2d4d; border-radius: 18px; padding: 24px; max-width: 760px; margin: 0 auto; text-align: left; box-shadow: 0 20px 50px rgba(0,0,0,.22); }
.card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.genre-pill { background: rgba(255,107,53,.15); color: #ffb199; padding: 6px 10px; border-radius: 999px; font-size: 13px; }
.score { color: #ffd166; font-weight: 700; }
.synopsis { margin: 16px 0; color: #ddd; }
.success { color: #9df2c9; margin-top: 10px; }
</style>
