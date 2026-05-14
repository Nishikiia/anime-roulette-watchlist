<template>
  <nav class="navbar">
    <router-link to="/" class="logo">AniMinded</router-link>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/generator">Generator</router-link>
      <router-link to="/bookmarks">Bookmarks</router-link>
      <router-link to="/watched">Watched</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar { position: sticky; top: 0; width: 100%; box-sizing: border-box; background: rgba(26,26,48,.95); backdrop-filter: blur(10px); color: white; display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; z-index: 1000; border-bottom: 1px solid #2d2d4d; }
.logo { font-size: 22px; font-weight: 900; color: white; text-decoration: none; }
.links { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; }
.links a { text-decoration: none; color: #ddd; font-weight: 700; }
.links a:hover, .router-link-active { color: #FF6B35; }
@media (max-width: 640px) { .navbar { align-items: flex-start; gap: 12px; flex-direction: column; padding: 14px 18px; } .links { gap: 12px; font-size: 14px; } }
</style>
