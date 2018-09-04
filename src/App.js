import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import Messenger from "./Components/Messenger/Messenger";

// Components //

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();


class App extends Component {
  constructor() {
    super();
      this.state = {
        user: null,
        userId: null,
      }
  }
  googleLogin = () => {
    firebase.auth().signInWithPopup(provider).then((result) =>  {
      console.log(result)
      const dbRef = firebase.database().ref(`/Users/${result.user.uid}`);
      const friendsRef = firebase.database().ref(`/Users/${this.props.userId}`);

      // If there is something at Users/result.user.uid, get me that data
      // If there is nothing there,
      dbRef.update({ 
        name: `${result.user.displayName}`,
        email: `${result.user.email}` ,
        picture: `${result.user.photoURL}`,
        })
      const userId = auth.currentUser.uid // current userID
      console.log(userId);
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        picture: result.user.photoURL,
        }
      this.setState({
        user,
        userId
      })
      const token = result.credential.accessToken;
    }).catch(function (error) {
      console.log(error)
    });
  }
  googleLogout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      })
    })
  }
  guestLogin = () => {
    const user = {
      name: "Guest",
      email: "Guest",
      picture: "Guest",
    }
    this.setState ({
      user 
    })
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const user = {
          name: user.displayName,
          email: user.email,
          picture: user.picture,
          color: "",
          hobbies: "",
        }
        this.setState({
           user
        });
      }
      // else {
      //   user: null;
      // }
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Welcome to Jeff Chats!</h1>
        <h2>The Secret Cohort19 Slack Channel</h2>
        {this.state.user ? null : <button className="googleLogin" onClick={this.googleLogin}>Sign in with Google</button>} <button onClick={this.guestLogin} className="guestLogin">Guest Account</button>
        {(this.state.user || this.state.guest) ? <Messenger user={this.state.user} guest={this.state.guest} userId={this.state.userId} googleLogout={this.googleLogout} /> : null}
      </div>
    );
  }
}

export default App;
