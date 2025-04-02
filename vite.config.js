import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Dossier de sortie
  },
  server: {
    port: 3000, // Port de développement (facultatif)
  },
});
