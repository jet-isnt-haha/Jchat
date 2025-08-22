//可复用的图标按钮

interface IconButtonProps {
	onClick?: () => void;
	className: string;
	isLoading?: boolean;
	danger?: boolean;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
}

const IconButton = ({
	onClick,
	className,
	isLoading,
	danger = false,
	type = 'button',
	disabled = false
}: IconButtonProps) => {
	const _className = `material-symbols-outlined ${className}${isLoading ? ' loading' : ''}${disabled ? ' disabled' : ''}`;
	return (
		<button
			className={_className}
			onClick={onClick}
			style={danger ? { color: 'red' } : undefined}
			type={type}
			disabled={disabled}
		>
			{className}
		</button>
	);
};

export default IconButton;
