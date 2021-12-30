import { FC } from 'react';

import { SquareButton } from '../buttons';

interface AttributeButtonProps {
  active?: boolean;
  disabled?: boolean;
  attribute?: {
    value?: string;
  };
  onClick?: () => void;
}

const AttributeButton: FC<AttributeButtonProps> = ({ attribute, onClick, active, disabled }) => {
  const isColor = attribute?.value?.[0] === '#';

  return (
    <SquareButton
      style={{ backgroundColor: attribute?.value }}
      autoWidth={!isColor}
      disabled={disabled}
      onClick={onClick}
      active={active}
    >
      {isColor || attribute?.value}
    </SquareButton>
  );
};

export default AttributeButton;
