//可复用的图标按钮

interface IconButtonProps {
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	className: string;
	isLoading?: boolean;
	danger?: boolean;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	styleClass?: string;
}

const IconButton = ({
	onClick,
	className,
	isLoading,
	danger = false,
	type = 'button',
	disabled = false,
	styleClass = ''
}: IconButtonProps) => {
	const _className = `material-symbols-outlined ${className}${isLoading ? ' loading' : ''}${disabled ? ' disabled' : ''}  ${styleClass}`;
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
