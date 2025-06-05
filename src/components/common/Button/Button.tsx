import { ButtonHTMLAttributes } from 'react';
import { useButtonGroup } from './ButtonGroup';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'secondary-filled';
  size?: 'sm' | 'md' | 'lg';
  roundness?: 'standard' | 'pill';
  isLoading?: boolean;
  selected?: boolean;
}

/**
 * Button component that provides a styled button with support for different variants, sizes, and loading state.
 * Automatically detects when it's inside a ButtonGroup and adjusts styling accordingly.
 *
 * @component
 * @param {ButtonProps} props - The props for the Button component.
 * @param {'primary' | 'secondary' | 'secondary-filled'} props.variant - The variant of the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='lg'] - The size of the button.
 * @param {'standard' | 'pill'} [props.roundness='standard'] - The roundness of the button.
 * @param {boolean} [props.isLoading=false] - Whether the button shows a loading state.
 * @param {boolean} [props.selected=false] - Whether the button is selected (used in ButtonGroup).
 * @param {string} [props.className] - Additional class names for the button.
 * @example
 * ```tsx
 * <Button
 *   variant="primary"
 *   size="md"
 *   roundness="pill"
 *   isLoading={true}
 *   onClick={() => console.log('Button clicked')}
 * >
 *   Submit
 * </Button>
 * ```
 */
export default function Button({
  variant = 'primary',
  children,
  size = 'lg',
  roundness = 'standard',
  isLoading = false,
  disabled = false,
  selected = false,
  className,
  ...props
}: ButtonProps) {
  const isInButtonGroup = useButtonGroup();

  const sizeStyles = {
    sm: 'p-2 text-sm gap-0.5 ' + (roundness === 'pill' ? 'px-3' : ''),
    md: 'px-3 py-2 text-base gap-1',
    lg: 'px-4 py-2 text-lg gap-1.5',
  };

  const roundnessStyles = {
    standard: 'rounded-md',
    pill: 'rounded-full',
  };

  const baseStyles = `inline-flex items-center justify-center transition-all duration-200 font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 ${sizeStyles[size]} ${roundnessStyles[roundness]}`;

  const variantStyles = {
    primary:
      'bg-blue-500 text-black hover:bg-blue-600 hover:text-black',
    secondary:
      'border-1 border-white/20 text-white hover:bg-gray-900',
    'secondary-filled':
      'bg-gray-600 text-gray-200 hover:bg-gray-700',
  };

  const buttonGroupStyles = `inline-flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95 p-2 font-semibold text-sm ${selected ? 'bg-surface text-white shadow-md' : 'text-gray-500 bg-transparent shadow-none'}`;

  const buttonStyle = isInButtonGroup
    ? `${buttonGroupStyles} ${className || ''}`
    : `${baseStyles} ${variantStyles[variant]} ${className || ''}`;

  return (
    <button className={buttonStyle} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <span className="icon-[line-md--loading-twotone-loop]"></span>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export type { ButtonProps };