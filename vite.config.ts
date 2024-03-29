import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8000,
    },
    plugins: [react(), splitVendorChunkPlugin()],
});
