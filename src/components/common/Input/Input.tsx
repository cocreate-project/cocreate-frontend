import { InputHTMLAttributes, ReactNode, useState, KeyboardEvent } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string | ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

/**
 * Input component that provides a styled input field with optional icons and error handling.
 *
 * @component
 * @param {InputProps} props - The props for the Input component.
 * @param {string} [props.label] - The label for the input field.
 * @param {string} [props.error] - The error message to display below the input.
 * @param {string} [props.helperText] - The helper text to display below the input.
 * @param {ReactNode} [props.startIcon] - The icon to display at the start of the input.
 * @param {ReactNode} [props.endIcon] - The icon to display at the end of the input.
 * @param {string} [props.className] - Additional class names for the parent div.
 * @example
 * ```tsx
 * <Input
 *   label="Username"
 *   type="text"
 *   startIcon={<UserIcon />}
 *   endIcon={<CheckIcon />}
 *   error="Username is required"
 *   helperText="Enter your username"
 * />
 * ```
 */
export default function Input({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  type = 'text',
  disabled = false,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles =
    'w-full no-input-arrows rounded-md transition-colors font-medium duration-200 font-montserrat focus:outline-none text-sm px-3 py-2 bg-surface text-white placeholder:text-gray-400 placeholder:font-normal border border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500';

  const errorStyles = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500 placeholder:text-red-300'
    : '';

  const iconStyles = `${startIcon ? 'pl-10' : ''} ${endIcon || type === 'password' ? 'pr-10' : ''}`;
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const inputStyles = `${baseStyles} ${errorStyles} ${iconStyles} ${disabledStyles}`;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const allowedKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        '.',
        ',',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
      ];

      const isNumber = /[0-9]/.test(e.key);

      const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;

      if (!isNumber && !allowedKeys.includes(e.key) && !isModifierKey) {
        e.preventDefault();
      }
    }

    if (props.onKeyDown) {
      props.onKeyDown(e);
    }
  };

  return (
    <div className={`${className || ''}`}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-white">
          {label}
        </label>
      )}

      <div className="relative">
        {startIcon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            {startIcon}
          </div>
        )}

        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className={inputStyles}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          {...props}
        />

        {type === 'password' ? (
          <div
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <span className="icon-[lucide--eye-closed]"></span>
            ) : (
              <span className="icon-[lucide--eye]"></span>
            )}
          </div>
        ) : (
          endIcon && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
              {endIcon}
            </div>
          )
        )}
      </div>

      {(error || helperText) && (
        <span
          className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-400'}`}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
}

export type { InputProps };
