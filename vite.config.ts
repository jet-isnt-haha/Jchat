import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			less: {
				// 可选：全局 less 变量、mixin 也可以配置在这里
				javascriptEnabled: true
			}
		},
		modules: {
			//让 *.module.less 生效
			generateScopedName: '[name]__[local]__[hash:base64:5]'
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~': fileURLToPath(new URL('./', import.meta.url))
		}
	}
});
