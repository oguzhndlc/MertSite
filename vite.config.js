// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',               // site
        game1: 'pages/games/first_game/index.html' // Phaser oyun sayfası
      }
    }
  }
});
