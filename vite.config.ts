/*
 * @Author: 'zhouhao1' 'zhouhao1@cyg.com'
 * @Date: 2024-09-26 14:06:29
 * @LastEditors: 'zhouhao1' 'zhouhao1@cyg.com'
 * @LastEditTime: 2024-10-09 18:00:13
 * @FilePath: \weather-search\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
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
