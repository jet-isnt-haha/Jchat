import config from '@/configs';

// 主钩子
export const useConfig = () => {
	return config;
};

// 分类钩子
export const useApiConfig = () => {
	return config.api;
};

export const useUIConfig = () => {
	return config.ui;
};

export const useAppConfig = () => {
	return config.app;
};

export const useContentConfig = () => {
	return config.content;
};

// 便捷钩子 - 常用内容的快捷访问
export const useTexts = () => {
	return config.content.ui;
};

export const useSystemMessages = () => {
	return config.content.system;
};

export const useModals = () => {
	return config.content.modals;
};
