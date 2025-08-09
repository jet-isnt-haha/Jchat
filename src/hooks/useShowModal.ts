import { useRef, useState } from 'react';

export const useShowModal = () => {
	const [showModal, setShowModal] = useState(false);

	const longPressTimer = useRef<ReturnType<typeof setTimeout>>(null);
	const touchStartTime = useRef<number>(null);

	const handleTouchStart = () => {
		touchStartTime.current = Date.now();
		longPressTimer.current = setTimeout(() => {
			setShowModal(true);
		}, 500);
	};

	const handleTouchEnd = () => {
		if (longPressTimer.current) {
			clearTimeout(longPressTimer.current);
			longPressTimer.current = null;
		}
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return {
		showModal,
		setShowModal,
		handleTouchStart,
		handleTouchEnd,
		closeModal
	};
};
