import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.genie.app',
  appName: 'Genie',
  webDir: 'out',
  server: {
    // For development, point to your local Next.js dev server
    // url: 'http://localhost:3000',
    // cleartext: true,
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0F0A1A',
      showSpinner: true,
      spinnerColor: '#7C3AED',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0F0A1A',
    },
  },
  ios: {
    contentInset: 'automatic',
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
