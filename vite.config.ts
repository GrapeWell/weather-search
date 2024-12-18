import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';
import findUnusedFilesPlugin from 'vite-plugin-unused-files';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
    findUnusedFilesPlugin({
      entryFile: 'src/main.tsx', // 设置入口文件
      alias: { '@': 'src' }, // 别名配置
      include: ['src/**/*.{tsx,ts,jsx,js,css,less,png,jpg,gif,svg}'],
      exclude: ['src/**/*.d.ts'],
      dryRun: true, // 先运行 dryRun 确认未使用文件
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
