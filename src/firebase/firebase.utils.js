import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey            : 'AIzaSyA-3HjQZe1o5k53u0gPfx-5HbKAkpqgtiw',
	authDomain        : 'crwn-db-f59f1.firebaseapp.com',
	databaseURL       : 'https://crwn-db-f59f1.firebaseio.com',
	projectId         : 'crwn-db-f59f1',
	storageBucket     : 'crwn-db-f59f1.appspot.com',
	messagingSenderId : '680379842828',
	appId             : '1:680379842828:web:9d036a7846ffe53033c929',
	measurementId     : 'G-3KL2SWRB0X'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
