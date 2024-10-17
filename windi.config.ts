import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    extend: {
      backgroundColor: {
        base: 'var(--bg-base)',
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      colors: {
        homeBackground: '#F5F5F5',
        textPrimary: '#4A4A4A',
        textSecondary: '#A0A0A0',
      },
    },
  },
});
