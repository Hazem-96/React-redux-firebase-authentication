import React from 'react'
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Switch} from 'react-router-dom'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Home from './Home'
import Profile from './Profile'
import styles from './App.css'

const App = () => (
    <div className={ styles.App }>

        <Router>
            <div >
            <NavBar/>
            <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/register" exact component={RegisterForm} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/"  component={Home} />
            </Switch>
            </div>
        </Router>
    </div>
)

export default App