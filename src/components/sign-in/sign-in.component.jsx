import React from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { signInWithGoogle, auth } from '../../firebase/firebase.utils';


class SignIn extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }

    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.log(error);
        }
    };




    handelChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput name='email' type="email" value={this.state.email} label="Email" handelChange={this.handelChange} />

                    <FormInput name='password' type="password" value={this.state.password} label="Password" handelChange={this.handelChange} />


                    <div className="buttons">
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <button className='google' onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>

                </form>

            </div>
        )
    }
}


export default SignIn;