import React, { Component } from 'react';
import './Messenger.css';
import Friends from "../Friends/Friends";
import Chat from "../Chat/Chat";
import Nav from "../Nav/Nav"
import firebase from '../../firebase'

class Messenger extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            profile: {}
        }
    }
    addToList = (color, hobbie) => {
        const friendsRef = firebase.database().ref(`/Users/${this.props.userId}`);
        friendsRef.update({ color: color, hobbies: hobbie })
    }
    componentDidMount() {
        const friendsRef = firebase.database().ref(`/Users/${this.props.userId}`);
        friendsRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({
                user: snapshot.val(),
            })
        })
    }
    render() {
        return (
            <div className="body">
                <div className="topNav">
                    <Nav addToList={this.addToList} user={this.props.user}/>
                </div>  
                <div className="main">  
                    <Friends user={this.props.user} userId={this.props.userId} /> 
                    <Chat user={this.props.user} />
                </div>

            </div>
        )
    }
}

export default Messenger