/**
 * Created by hazem on 19/01/2018.
 */
import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel, Image } from "react-bootstrap";
import  { database} from '../Firebase';
import styles from './profile.css'

class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            photo: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', //initiallizing with Anonymous Avatar
            BD: '',
            address: '',
            user: this.props.user

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange ( event ) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    componentDidMount() {
        if (this.state.user) {

            //getting user details from db
            database.ref('/users/' + this.state.user.uid ).once('value').then( snapshot => {
                let user = snapshot.val() ;
                if (user) {
                    this.setState({
                        BD: user.BD || '',
                        address: user.address,
                        username: user.username
                    });
                }

            });
        }
    }

    handleSubmit ( event ) {
        event.preventDefault(); // <- prevent form submit from reloading the page
        // Send the user details to Firebase database
        database.ref('users/' + this.state.user.uid).set({
            username: this.state.username,
            email: this.state.user.email,
            BD : this.state.BD,
            address: this.state.address
        });
        //State Reinitialisation
        this.setState({
            username: '',
            photo: '',
            BD: null,
            address: '',
            user: null,
            profile: null
        });
        //redirect to home after saving details to db
        this.props.history.push("/");

    }


    render() {
        const {dispatch, isAuthenticated,user  } = this.props ;
        this.state.user = user;
        return(
            <div className={styles.mid}>
                {user ?
                    <div>
                        <h2>Your Profile</h2>

                        <Image className={styles.img} src={this.state.photo} alt="profile_image" thumbnail></Image>
                        <p className={styles.desc}>
                            Name: {this.state.username}<br/>
                            email: {user.email}<br/>

                            Verification :{user.emailVerified ? 'Verified' : 'unverified'}<br/>
                        </p>
                        <h3>Edit Profile</h3>
                        <form onSubmit={this.handleSubmit}>

                            <FormGroup controlId="username">
                                <ControlLabel>Name</ControlLabel>
                                <FormControl

                                    type="text"
                                    placeholder={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="BD">
                                <ControlLabel>Birth date</ControlLabel>
                                <FormControl

                                    type="date"
                                    value={this.state.BD}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="address">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl

                                    type="text"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <Button
                                block
                                type="submit"
                            >
                                Save changes
                            </Button>
                        </form>
                    </div>

                    : <em>Sign In to access the profile section</em>
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.user
    }
}
Profile = connect(mapStateToProps)(Profile);
export default Profile;
