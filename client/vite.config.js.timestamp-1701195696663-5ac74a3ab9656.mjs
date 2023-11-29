// vite.config.js
import { defineConfig } from "file:///C:/Users/shris/react_vite/mern-project/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/shris/react_vite/mern-project/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  server: {
    //server to not write http address for many times 
    proxy: {
      "/api": {
        target: "http://localhost:3020",
        //target for make it imp or secure 
        secure: false
      }
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxzaHJpc1xcXFxyZWFjdF92aXRlXFxcXG1lcm4tcHJvamVjdFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHNocmlzXFxcXHJlYWN0X3ZpdGVcXFxcbWVybi1wcm9qZWN0XFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvc2hyaXMvcmVhY3Rfdml0ZS9tZXJuLXByb2plY3QvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOntcbiAgICAvL3NlcnZlciB0byBub3Qgd3JpdGUgaHR0cCBhZGRyZXNzIGZvciBtYW55IHRpbWVzIFxuICAgIHByb3h5OntcbiAgICAgICcvYXBpJzp7XG4gICAgICAgIHRhcmdldDonaHR0cDovL2xvY2FsaG9zdDozMDIwJyxcbiAgICAgICAgLy90YXJnZXQgZm9yIG1ha2UgaXQgaW1wIG9yIHNlY3VyZSBcbiAgICAgICAgc2VjdXJlOmZhbHNlLFxuICAgICAgfSxcbiAgICB9LCBcbiAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbcmVhY3QoKV1cbiAgXG4gIH0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsb0JBQW9CO0FBQ2xXLE9BQU8sV0FBVztBQUVsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFPO0FBQUE7QUFBQSxJQUVMLE9BQU07QUFBQSxNQUNKLFFBQU87QUFBQSxRQUNMLFFBQU87QUFBQTtBQUFBLFFBRVAsUUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDQTtBQUFBLEVBQ0ksU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUV2QixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
