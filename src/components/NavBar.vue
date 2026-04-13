<template>
  <nav class="navbar">
    <h2 class="logo">AniMinded</h2>

    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/generator">Generator</router-link>
      <router-link to="/bookmarks">Bookmarks</router-link>
      <router-link to="/watched">Watched</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0; /* IMPORTANT */
  width: 100%;
  box-sizing: border-box; /* 🔥 FIX */
  background: #1A1A30;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  z-index: 1000;
}

/* Logo */
.logo {
  font-size: 20px;
}

/* Links */
.links a {
  margin-left: 20px;
  text-decoration: none;
  color: white;
}

/* Active link */
.router-link-active {
  color: #FF6B35;
}
</style>