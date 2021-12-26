import './style.css';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency } from '../../../store';

const CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const CurrencySwitcherItem = () => {
  const { loading, error, data } = useQuery(CURRENCIES);
  const currency = useSelector(state => state.appConfigurations.currency);

  const dispatch = useDispatch();

  const onChangeCurrencyClick = activeCurrency => {
    dispatch(changeCurrency(activeCurrency));
  };

  return (
    <div className="currency-switcher-item-wrapper">
      {data?.currencies.map(element => {
        return (
          <p
            className={element.label === currency ? 'currency-name active-currency-name' : 'currency-name'}
            key={element.label}
            onClick={() => onChangeCurrencyClick(element.label)}
          >
            {element.symbol + element.label}
          </p>
        );
      })}
    </div>
  );
};

export default CurrencySwitcherItem;
