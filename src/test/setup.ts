import '@testing-library/jest-dom';
// 模拟 navigator.clipboard API
Object.defineProperty(navigator, 'clipboard', {
	value: {
		writeText: vi.fn().mockResolvedValue(undefined),
		readText: vi.fn().mockResolvedValue('')
	},
	writable: true
});

// 模拟 window.alert
global.alert = vi.fn();

// 模拟 console 方法以减少测试输出噪音
global.console = {
	...console,
	log: vi.fn(),
	error: vi.fn(),
	warn: vi.fn()
};

// 模拟 fetch API（用于 API 调用测试）
global.fetch = vi.fn();

// 模拟 ResizeObserver（某些组件可能需要）
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn()
}));
