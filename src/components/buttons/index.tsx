import clsx from 'clsx';
import { FC, CSSProperties } from 'react';
import './style.css';

interface SquareButtonProps {
  className?: string | boolean;
  autoWidth?: boolean;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export const SquareButton: FC<SquareButtonProps> = ({
  children,
  onClick,
  className,
  autoWidth,
  disabled,
  active,
  style,
}) => (
  <button
    type="button"
    style={style}
    onClick={onClick}
    disabled={disabled}
    className={clsx('square-button', autoWidth && 'auto-width', className, disabled && 'disabled', active && 'active')}
  >
    {children}
  </button>
);
