import CategoryName from './CategoryName';
import CurrencySwitcher from './CurrencySwitcher';
import './style.css';
import MainIconPicture from '../assets/icons/MainIcon';
import HeaderCart from './HeaderCart';

const Header = () => (
  <div className="header-wrapper">
    <CategoryName />
    <MainIconPicture className="main-icon-wrapper" />
    <div className="header-actions-wrapper">
      <CurrencySwitcher />
      <HeaderCart />
    </div>
  </div>
);

export default Header;
