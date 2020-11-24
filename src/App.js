import React from 'react';
import './App.css';
import HomePage from './pages/homepage/HomePage.component.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component.jsx';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser : null
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user });
			console.log(user);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}
	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<Header currentUser={this.state.currentUser} />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/shop" component={ShopPage} />
						<Route exact path="/signin" component={SignInAndSignOut} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
