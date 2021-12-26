import { useState } from 'react';
import CurrencySwitcherItem from './CurrencySwitcherItem';
import CurrencySwitcherPicture from '../../assets/icons/CurrencySwitcherPictures/CurrencySwitcherPicture';
import clsx from 'clsx';
import './style.css';
import CurrencySwitcherArrow from '../../assets/icons/CurrencySwitcherPictures/CurrencySwitcherArrow';

const CurrencySwitcher = () => {
  const [isCurrencySwitcherOpened, setCurrencySwitcherOpened] = useState(false);
  const onCurrencySwitcherClick = () => {
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
