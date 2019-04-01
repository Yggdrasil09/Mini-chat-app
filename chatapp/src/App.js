import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import firebase from 'firebase';

import Upload from './components/Upload/Upload';
import Chat from './components/Chat/Chat';

var config = {
	apiKey: "AIzaSyAS3n4oxrliftxU6J-nmeak4__yZmNcyS4",
	authDomain: "chat-bot-7979d.firebaseapp.com",
	databaseURL: "https://chat-bot-7979d.firebaseio.com",
	projectId: "chat-bot-7979d",
	storageBucket: "chat-bot-7979d.appspot.com",
};

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      	<Container>
			<Row>
				<Col sm={3}>
					<Upload/>
				</Col>
				<Col sm={9}>
					<Chat/>
				</Col>
			</Row>
      	</Container>
    );
  }
}

export default App;
