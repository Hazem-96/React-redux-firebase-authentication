/**
 * Created by hazem on 18/01/2018.
 */
import React, {Component} from 'react'
import styles from './home.css'

export default class Home extends Component {
render (){
    return (
    <div className={ styles.Home }>
        <div className={ styles.lander }>
            <h1>Landing Page</h1>
            <p> A test Screen</p>
        </div>
        <br/>
        <hr/>
        <p className={styles.footer}><em>Hazem @ReactApp</em></p>
    </div>

)}
}