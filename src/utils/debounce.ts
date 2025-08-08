export default function debounce<
	T extends (...args: Args) => void,
	Args extends unknown[] = Parameters<T>
>(fn: T, delay = 300) {
	let timer: ReturnType<typeof setTimeout> | null = null;

	const debounced = function (this: ThisParameterType<T>, ...args: Args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
			timer = null;
		}, delay);
	};

	debounced.cancel = function () {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};
	return debounced;
}
