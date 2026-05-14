<template>
  <main class="home page">
    <section class="hero-section">
      <div class="badge">{{ animeList.length }} curated titles · no account needed</div>
      <h1>Discover your next <span>anime obsession</span></h1>
      <p class="subtitle">AniMinded helps users overcome choice paralysis by generating anime recommendations, saving them to a watchlist, and tracking completed titles with ratings and notes.</p>
      <div class="buttons">
        <router-link to="/generator" class="primary">Start Discovering</router-link>
        <router-link to="/bookmarks" class="secondary">View Library</router-link>
      </div>
      <img :src="hero" alt="Anime discovery illustration" class="hero-img" />
    </section>

    <section class="how">
      <p class="eyebrow">MVP Workflow</p>
      <h2>How it works</h2>
      <div class="steps">
        <article class="card"><h3>01 Generate</h3><p>Choose a genre and receive a random recommendation from the local dataset.</p></article>
        <article class="card"><h3>02 Bookmark</h3><p>Save interesting titles into Plan to Watch using persistent browser storage.</p></article>
        <article class="card"><h3>03 Rate & Review</h3><p>Move completed anime to Watched, rate them from 1–10, and add personal notes.</p></article>
      </div>
    </section>
  </main>
</template>

<script setup>
import hero from '../assets/hero.png'
import { animeList } from '../data/anime'
</script>

<style scoped>
.home { text-align: center; }
.hero-section { max-width: 940px; margin: 0 auto; }
.badge { display: inline-block; background: rgba(108,60,225,.18); border: 1px solid rgba(108,60,225,.55); padding: 7px 13px; border-radius: 999px; font-size: 13px; color: #ddd; }
h1 { font-size: clamp(42px, 7vw, 78px); line-height: .95; margin: 22px 0; text-transform: uppercase; }
h1 span { color: #8d6cff; display: block; }
.subtitle { max-width: 720px; margin: 0 auto; color: #c9c9d8; }
.buttons { margin: 26px 0; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.primary, .secondary { padding: 13px 18px; border-radius: 10px; text-decoration: none; color: white; font-weight: 800; }
.primary { background: #6C3CE1; }
.secondary { border: 1px solid #6C3CE1; }
.primary:hover, .secondary:hover { background: #FF6B35; border-color: #FF6B35; }
.hero-img { width: min(340px, 80vw); margin-top: 18px; }
.how { margin: 70px auto 0; max-width: 1000px; }
.how h2 { font-size: 34px; margin-bottom: 22px; }
.steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 18px; }
.card { background: #1A1A30; border: 1px solid #2d2d4d; border-radius: 18px; padding: 22px; text-align: left; }
.card h3 { color: #FF6B35; margin-top: 0; }
</style>
