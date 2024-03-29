import { FC } from 'react';

interface CurrencySwitcherArrowProps {
  className?: string;
}

const CurrencySwitcherArrow: FC<CurrencySwitcherArrowProps> = ({ className }) => (
  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CurrencySwitcherArrow;
