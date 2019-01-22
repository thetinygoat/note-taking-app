import React, { Component } from 'react';

export default class NoteList extends Component {
	state = {
		noteList: []
	};
	componentDidMount() {
		fetch('https://note-taking-app-b6189.firebaseio.com/posts.json').then(
			res => {
				res.json().then(data => {
					let notes = Object.keys(data).map(key => {
						return Object.assign(data[key], { id: key });
					});
					console.log('notes:', notes);
					this.setState({
						noteList: notes
					});
				});
			}
		);
	}
	render() {
		let notes = this.state.noteList.map(note => {
			return <p key={note.id}>{note.name}</p>;
		});
		return <div>{notes}</div>;
	}
}
