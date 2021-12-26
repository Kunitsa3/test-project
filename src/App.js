import { useSelector } from 'react-redux';
import './App.css';
import Header from './Header';
import ProductCard from './ProductCard';

function App() {
  const darkBackground = useSelector(state => state.appConfigurations.darkBackground);

  return (
    <div className="App">
      {darkBackground && <div className="dark-background" />}
      <Header />
      <ProductCard />
    </div>
  );
}

export default App;
