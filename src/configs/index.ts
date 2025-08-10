import { apiConfig } from './api.config';
import { uiConfig } from './ui.config';
import { appConfig } from './app.config';
import { contentConfig } from './content.config';

export const config = {
	api: apiConfig,
	ui: uiConfig,
	app: appConfig,
	content: contentConfig
} as const;

export default config;
