import React from 'react';
import './App.css';
import HomePage from './pages/homepage/HomePage.component.jsx';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignOut from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/user.action.js';
class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const uerRef = await createUserProfileDocument(userAuth);
				uerRef.onSnapshot((snapShot) => {
					this.props.setCurrentUser(
						{
							currentUser : {
								id : snapShot.id,
								...snapShot.data()
							}
						},
						() => {
							console.log(this.state);
						}
					);
				});
			}

			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}
	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<Header />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/shop" component={ShopPage} />
						<Route
							exact
							path="/signin"
							render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignOut />)}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser : user.currentUser
});
const mapDispatchToProps = (dispatch) => ({
	setCurrentUser : (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
