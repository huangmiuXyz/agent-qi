import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import VueRouter from 'unplugin-vue-router/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    VueRouter({}),
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', {
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar'
        ]
      }],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/store', 'src/hooks', 'src/utils', 'src/decorators'],
    }),
    Components({
      dirs: ['src/components', "src/pages/**/components"],
      dts: 'src/types/components.d.ts',
      resolvers: [NaiveUiResolver()],
      deep: true
    }),
    tailwindcss(),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
        protocol: "ws",
        host,
        port: 1421,
      }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '~': resolve('src/pages'),
    },
  },
}));
