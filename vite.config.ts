import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts({ insertTypesEntry: true })],
	build: {
		lib: {
			entry: {
				'mantine-datagrid': path.resolve(__dirname, './src/index.ts'),
				'localization': path.resolve(__dirname, './src/localization/index.ts')
			},
			formats: ['es'],
			fileName: (format, entry) => `${entry}.${format}.js`
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime', '@emotion/react', '@mantine/core', '@mantine/hooks'],
			output: {
				globals: {
					'react': 'React',
					'react/jsx-runtime': 'jsxRuntime',
					'react-dom': 'ReactDOM'
				}
			}
		}
	}
})
