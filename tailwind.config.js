// tailwind.config.js
module.exports = {
	theme: {
		extend: {
			keyframes: {
				spin: {
					from: { transform: 'rotate(0deg) translateX(5px) rotate(0deg)' },
					to: { transform: 'rotate(360deg) translateX(5px) rotate(-360deg)' }
				}
			},
			animation: {
				'custom-spin': 'spin 1s linear infinite'
			}
		}
	}
};
