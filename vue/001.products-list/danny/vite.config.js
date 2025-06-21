import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  base: './', // 使用相对路径而不是绝对路径
  plugins: [vue()],
});
