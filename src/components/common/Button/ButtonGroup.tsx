import React, {
  createContext,
  useContext,
  ReactNode,
  ReactElement,
} from 'react';

export const ButtonGroupContext = createContext(false);

export function useButtonGroup() {
  return useContext(ButtonGroupContext);
}

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

/**
 * ButtonGroup component that groups Button components together with proper styling.
 *
 * @component
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="primary">One</Button>
 *   <Button variant="primary">Two</Button>
 *   <Button variant="primary">Three</Button>
 * </ButtonGroup>
 * ```
 */
export default function ButtonGroup({
  children,
  className = '',
}: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={true}>
      <div
        className={`inline-flex p-1 gap-1 bg-neutral-900 rounded-md overflow-hidden ${className}`}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            // Safe to cast as ReactElement since we've checked with isValidElement
            const element = child as ReactElement<any>;
            return React.cloneElement(element, {
              // Apply custom styling to grouped buttons
              className: `${element.props.className || ''} ${index > 0 ? '-ml-px' : ''}`,
            });
          }
          return child;
        })}
      </div>
    </ButtonGroupContext.Provider>
  );
}
