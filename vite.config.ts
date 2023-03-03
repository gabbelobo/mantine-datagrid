import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts({ insertTypesEntry: true })],
	build: {
		lib: {
			entry: path.resolve(__dirname, './src/index.ts'),
			name: 'mantine-datagrid',
			formats: ['es', 'umd'],
			fileName: (format) => `mantine-datagrid.${format}.js`
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime', '@emotion/react', '@mantine/core', '@mantine/hooks'],
			output: {
				globals: {
					react: 'React',
					'react/jsx-runtime': 'jsxRuntime',
					'react-dom': 'ReactDOM'
				}
			}
		}
	}
})
