<template>
  <div class="home">

    <!-- HERO SECTION -->
    <div class="hero">

      <!-- Badge -->
      <div class="badge">1200+ titles in the database</div>

      <!-- Title -->
      <h1 class="title">
        DISCOVER YOUR NEXT<br />
        <span>OBSESSION</span>
      </h1>

      <!-- Subtitle -->
      <p class="subtitle">
        Stop scrolling endlessly. AniMinded generates personalized picks, tracks your watchlist,
        and lets you rate everything you've seen.
      </p>

      <!-- Buttons -->
      <div class="buttons">
        <router-link to="/generator">
          <button class="primary">Start Discovering</button>
        </router-link>

        <router-link to="/bookmarks">
          <button class="secondary">View My Library</button>
        </router-link>
      </div>

      <!-- Image -->
      <img :src="hero" alt="Hero Image" class="hero-img" />

      <!-- Footnote -->
      <p class="footnote">No account needed · Saves locally in your browser</p>
    </div>

    <!-- HOW IT WORKS -->
    <div class="how">
      <h2>HOW IT WORKS</h2>

      <div class="steps">

        <div class="card">
          <h3>STEP 01</h3>
          <h4>Generate</h4>
          <p>Pick a genre and let the engine surface a random match from 1,200+ titles.</p>
        </div>

        <div class="card">
          <h3>STEP 02</h3>
          <h4>Bookmark</h4>
          <p>Save shows you like into your personal watchlist instantly.</p>
        </div>

        <div class="card">
          <h3>STEP 03</h3>
          <h4>Rate & Track</h4>
          <p>After watching, move it to Completed and give it a 1-10 score.</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import hero from '../assets/hero.png'
</script>

<style scoped>
.home {
  background: #0F0F1A;
  min-height: 100vh;
  color: white;
  padding-top: 80px;
  text-align: center;
}

/* HERO */
.hero {
  max-width: 900px;
  margin: 0 auto;
}

/* Badge */
.badge {
  display: inline-block;
  background: #1A1A30;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 15px;
}

/* Title */
.title {
  font-size: 52px;
  font-weight: bold;
  line-height: 1.2;
}

.title span {
  color: #6C3CE1;
}

/* Subtitle */
.subtitle {
  font-size: 16px;
  color: #ccc;
  max-width: 600px;
  margin: 20px auto;
}

/* Buttons */
.buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 20px 0;
}

.primary {
  padding: 12px 18px;
  background: #6C3CE1;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
}

.primary:hover {
  background: #FF6B35;
}

.secondary {
  padding: 12px 18px;
  background: transparent;
  border: 1px solid #6C3CE1;
  border-radius: 7px;
  color: white;
  cursor: pointer;
}

/* Image */
.hero-img {
  width: 320px;
  margin-top: 25px;
}

/* Footnote */
.footnote {
  font-size: 12px;
  color: #888;
  margin-top: 10px;
}

/* HOW IT WORKS */
.how {
  margin-top: 80px;
  padding: 40px 20px;
}

.how h2 {
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.steps {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  background: #1A1A30;
  padding: 20px;
  border-radius: 12px;
  width: 250px;
  text-align: left;
}

.card h3 {
  color: #FF6B35;
  font-size: 14px;
}

.card h4 {
  margin: 10px 0;
}
</style>