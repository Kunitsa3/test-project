import clsx from 'clsx';
import './style.css';

export const SquareButton = ({ children, onClick, className, disabled, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={clsx('square-button', className, disabled && 'disabled', active && 'active')}
  >
    {children}
  </button>
);
