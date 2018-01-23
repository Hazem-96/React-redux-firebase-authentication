/**
 * Created by hazem on 17/01/2018.
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel, ButtonToolbar, Alert } from "react-bootstrap";
import  { auth, provider } from '../Firebase';
import {loginUser} from '../actions';
import styles from './register.css'

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            user: null,
            error: null
        };
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange (event ) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit (event ) {
        event.preventDefault();
        console.log('clicked');
        this.props.dispatch(loginUser(this.state.email,this.state.password,this.props.history))

    }
    loginWithGoogle () {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
                this.props.history.push("/");
            });
    }
    render() {
        const {error} = this.props;
        return (
            <div className={ styles.mid }>
                {error &&
                <Alert bsStyle="danger">
                    {error}
                </Alert>
                }
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="medium">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="medium">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block

                        bsSize="medium"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                    <p><em>you don't have an account ? <a href="/register">Sign up</a> </em></p>
                    <p><strong>-- Or --</strong></p>

                </form>
                <ButtonToolbar>
                    <Button
                        block
                        bsStyle="primary"
                        type="button"
                        onClick={this.loginWithGoogle}
                    >
                        Login with Google Account
                    </Button>
                </ButtonToolbar>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        error: state.user.errorMessage
    }
}
LoginForm = connect(mapStateToProps)(LoginForm);
export default LoginForm;
