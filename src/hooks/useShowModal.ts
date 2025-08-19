import { useState } from 'react';

export const useShowModal = () => {
	const [showModal, setShowModal] = useState(false);

	const [selectedId, setSelectedId] = useState('');

	const closeModal = () => {
		setShowModal(false);
		setSelectedId('');
	};
	const openModal = (id: string) => {
		setSelectedId(id);
		setShowModal(true);
	};
	return {
		showModal,
		setShowModal,
		openModal,
		closeModal,
		selectedId
	};
};
