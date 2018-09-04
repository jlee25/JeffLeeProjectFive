import React, { Component } from 'react';
import './Friends.css';
import firebase from '../../firebase'

const dbRef = firebase.database().ref('/Users')

class Friends extends Component  {
    constructor() {
        super();
        this.state = {
            users: {},
            userId: {}
        }
    }
    componentDidMount() {
        dbRef.on('value', (snapshot) => { 
            console.log(snapshot.val());
            this.setState({
                users: snapshot.val(),
            });
            })
        }
    render() {
        return (
            <div className="friendsContainer">
                <h2>Your Friends List</h2>
                <div className="listofFriends">
                    {Object.entries(this.state.users).map((key) => {
                        return (
                            <div className="profile">
                                <img src={key[1].picture} alt="Your profile image"/>
                                <div className="information">
                                    <h3>{key[1].name}</h3>
                                    <p><span className="span">Color:</span> {key[1].color}</p>
                                    <p><span className="span">Hobbies:</span> {key[1].hobbies}</p>
                                </div>
                            </div>    
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Friends