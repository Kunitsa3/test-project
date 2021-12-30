import clsx from 'clsx';
import { useState } from 'react';

import CurrencySwitcherArrow from '../../assets/icons/CurrencySwitcherPictures/CurrencySwitcherArrow';
import CurrencySwitcherPicture from '../../assets/icons/CurrencySwitcherPictures/CurrencySwitcherPicture';

import CurrencySwitcherItem from './CurrencySwitcherItem';

import './style.css';

const CurrencySwitcher = () => {
  const [isCurrencySwitcherOpened, setCurrencySwitcherOpened] = useState(false);

  const onCurrencySwitcherClick = (): void => {
    setCurrencySwitcherOpened(oldState => !oldState);
  };

  return (
    <div className="currency-switcher-wrapper">
      <div className="currency-switcher-items-wrapper" onClick={onCurrencySwitcherClick}>
        <CurrencySwitcherPicture />
        <CurrencySwitcherArrow className={clsx('currency-switcher-arrow', isCurrencySwitcherOpened && 'opened')} />
      </div>
      {isCurrencySwitcherOpened && <CurrencySwitcherItem />}
    </div>
  );
};

export default CurrencySwitcher;
