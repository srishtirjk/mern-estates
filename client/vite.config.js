import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    //server to not write http address for many times 
    proxy:{
      '/api':{
        target:'http://localhost:3020',
        //target for make it imp or secure 
        secure:false,
      },
    }, 
    },
        plugins: [react()]
  
  })
