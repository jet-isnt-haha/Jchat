//可复用的图标按钮

interface IconButtonProps {
	onClick?: () => void;
	className: string;
	isLoading?: boolean;
	danger?: boolean;
}

const IconButton = ({
	onClick,
	className,
	isLoading,
	danger = false
}: IconButtonProps) => {
	const _className = `material-symbols-outlined ${className} ${isLoading ? 'loading' : ''}`;
	return (
		<button
			className={_className}
			onClick={onClick}
			style={danger ? { color: 'red' } : undefined}
		>
			{className}
		</button>
	);
};

export default IconButton;
