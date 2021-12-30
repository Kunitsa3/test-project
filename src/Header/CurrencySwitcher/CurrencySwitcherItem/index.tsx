/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './style.css';
import { useQuery, gql } from '@apollo/client';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { changeCurrency, useAppSelector } from '../../../store';

const CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

interface CurrenciesRequest {
  currencies: {
    label: string;
    symbol: string;
  }[];
}

const CurrencySwitcherItem: FC = () => {
  const { data } = useQuery<CurrenciesRequest>(CURRENCIES);
  const currency = useAppSelector(state => state.appConfigurations.currency);

  const dispatch = useDispatch();

  const onChangeCurrencyClick = (activeCurrency: { label: string; symbol: string }) => {
    dispatch(changeCurrency(activeCurrency));
  };

  return (
    <div className="currency-switcher-item-wrapper">
      {data?.currencies.map(element => (
        <p
          className={element.label === currency.label ? 'currency-name active-currency-name' : 'currency-name'}
          key={element.label}
          onClick={() => onChangeCurrencyClick(element)}
        >
          {element.symbol + element.label}
        </p>
      ))}
    </div>
  );
};

export default CurrencySwitcherItem;
