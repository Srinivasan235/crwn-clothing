import './App.css';
import HomePage from './pages/homepage/HomePage.component.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component.jsx';
function App() {
	return (
		<div className="container">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/shop" component={ShopPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
