import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    __API_URL__: mode === 'production'
      ? '"https://cartao-churn-api-dmcvhjc0byfjgghg.brazilsouth-01.azurewebsites.net"'
      : '""'
  },
  server: {
    proxy: {
      '/api': 'https://cartao-churn-api-dmcvhjc0byfjgghg.brazilsouth-01.azurewebsites.net'
    }
  }
}))