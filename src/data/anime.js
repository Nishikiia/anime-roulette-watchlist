export const animeList = [
  { id: 1, title: 'Attack on Titan', genre: 'Action', episodes: 75, synopsis: 'Humanity fights for survival inside walled cities while uncovering the mystery behind the Titans.', score: 9.0 },
  { id: 2, title: 'Demon Slayer', genre: 'Action', episodes: 44, synopsis: 'Tanjiro joins the Demon Slayer Corps to protect his sister and defeat powerful demons.', score: 8.7 },
  { id: 3, title: 'Jujutsu Kaisen', genre: 'Action', episodes: 47, synopsis: 'A student becomes tied to a deadly curse and trains with sorcerers to protect others.', score: 8.8 },
  { id: 4, title: 'Fullmetal Alchemist: Brotherhood', genre: 'Action', episodes: 64, synopsis: 'Two brothers search for the Philosopher’s Stone after a forbidden alchemy ritual goes wrong.', score: 9.1 },
  { id: 5, title: 'Your Name', genre: 'Romance', episodes: 1, synopsis: 'Two strangers mysteriously swap bodies and form a connection across distance and time.', score: 8.8 },
  { id: 6, title: 'Toradora!', genre: 'Romance', episodes: 25, synopsis: 'Two classmates form an unlikely alliance and slowly discover deeper feelings.', score: 8.0 },
  { id: 7, title: 'Fruits Basket', genre: 'Romance', episodes: 63, synopsis: 'A kind student becomes involved with a family affected by a strange zodiac curse.', score: 8.6 },
  { id: 8, title: 'Kaguya-sama: Love is War', genre: 'Romance', episodes: 41, synopsis: 'Two brilliant student council leaders turn romance into a hilarious battle of pride.', score: 8.7 },
  { id: 9, title: 'Re:Zero', genre: 'Isekai', episodes: 50, synopsis: 'A boy transported to another world discovers that death resets his timeline.', score: 8.5 },
  { id: 10, title: 'That Time I Got Reincarnated as a Slime', genre: 'Isekai', episodes: 72, synopsis: 'An office worker is reborn as a slime and builds a peaceful monster nation.', score: 8.1 },
  { id: 11, title: 'Sword Art Online', genre: 'Isekai', episodes: 96, synopsis: 'Players trapped in a virtual reality game must clear every floor to survive.', score: 7.2 },
  { id: 12, title: 'No Game No Life', genre: 'Isekai', episodes: 12, synopsis: 'Two genius gamers are transported to a world where every conflict is settled through games.', score: 8.1 },
  { id: 13, title: 'Haikyuu!!', genre: 'Sports', episodes: 85, synopsis: 'A passionate volleyball player works with his team to compete at the national level.', score: 8.7 },
  { id: 14, title: 'Blue Lock', genre: 'Sports', episodes: 24, synopsis: 'Talented strikers compete in an intense program designed to create Japan’s best forward.', score: 8.2 },
  { id: 15, title: 'Death Note', genre: 'Mystery', episodes: 37, synopsis: 'A student gains a notebook that can kill anyone whose name is written inside it.', score: 8.9 },
  { id: 16, title: 'Erased', genre: 'Mystery', episodes: 12, synopsis: 'A man is sent back to his childhood and tries to prevent a tragic kidnapping case.', score: 8.3 }
]

export const genres = [...new Set(animeList.map((anime) => anime.genre))]
