import { FC } from 'react';

import { SquareButton } from '../buttons';

interface AttributeButtonProps {
  active?: boolean;
  disabled?: boolean;
  attribute?: {
    value?: string;
  };
  onClick?: () => void;
  className?: string;
}

const AttributeButton: FC<AttributeButtonProps> = ({ attribute, onClick, active, disabled, className }) => {
  const isColor = attribute?.value?.[0] === '#';

  return (
    <SquareButton
      style={{ backgroundColor: attribute?.value }}
      autoWidth={!isColor}
      disabled={disabled}
      onClick={onClick}
      active={active}
      className={className}
    >
      {isColor || attribute?.value}
    </SquareButton>
  );
};

export default AttributeButton;
