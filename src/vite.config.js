import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://cartao-churn-api-dmcvhjc0byfjgghg.brazilsouth-01.azurewebsites.net'
    }
  }
})
