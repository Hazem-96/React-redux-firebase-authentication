/**
 * Created by hazem on 17/01/2018.
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import {registerUser} from '../actions';


import styles from "./register.css"

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    getValidationState() {
        let password = this.state.password;
        let password2 = this.state.password2;
        if ( password === password2 && password.length >= 6 ) return 'success';
        else if ( password !== password2 && password2.length > 0) return 'error';
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 6 && this.state.password2.length > 6  && this.state.password === this.state.password2;
    }

    handleChange ( event ) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit (event ) {
        event.preventDefault();
        this.props.dispatch(registerUser(this.state.email, this.state.password));
        this.setState({password: '',password2: ''});
    };

    render() {
        const {error} = this.props;
        return (
            <div className={ styles.mid }>
                {error &&
                <Alert bsStyle="danger">
                    {error}
                </Alert>
                }
                <form className="register" onSubmit={this.handleSubmit} >

                    <FormGroup controlId="email" >
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"

                        />
                    </FormGroup>
                    <FormGroup controlId="password2" validationState={this.getValidationState()}>
                        <ControlLabel>Retype Password</ControlLabel>
                        <FormControl
                            value={this.state.password2}
                            onChange={this.handleChange}
                            type="password"
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
                <p><em>you already have an account ? <a href="/login">Log in</a> </em></p>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.user.errorMessage
    }
}
RegisterForm = connect(mapStateToProps)(RegisterForm);
export default RegisterForm;