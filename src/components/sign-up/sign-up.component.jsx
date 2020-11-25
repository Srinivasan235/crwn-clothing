import React from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component.jsx';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            displayName: " ",
            email: " ",
            password: "",
            confirmPassword: "",
        }
    }

    handelSubmit = async event => {
        event.preventDefault()
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            createUserProfileDocument(user, { displayName })

            this.setState = {
                displayName: " ",
                email: " ",
                password: "",
                confirmPassword: "",
            }
        }
        catch (error) {
            console.log(error);
        }


    }

    handelChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {

        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-un'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form onSubmit={this.handelSubmit} className="sign-up-form">

                    <FormInput name='displayName' type="text" value={this.state.displayName} label="Display Name" handelChange={this.handelChange} />
                    <FormInput name='email' type="email" value={this.state.email} label="Email" handelChange={this.handelChange} />
                    <FormInput name='password' type="password" value={this.state.password} label="Password" handelChange={this.handelChange} />
                    <FormInput name='confirmPassword' type="password" value={this.state.confirmPassword} label="confirmPassword" handelChange={this.handelChange} />

                    <div className="buttons">
                        <CustomButton type='submit'>SIGN UP</CustomButton>
                    </div>

                </form>

            </div>
        )
    }
}


export default SignUp;