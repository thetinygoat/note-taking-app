import React, { Component } from 'react';
import TextEditor from './containers/TextEditor/TextEditor';

class App extends Component {
	state = {
		post: null
	};
	componentDidMount() {
		fetch('https://note-taking-app-b6189.firebaseio.com/posts.json').then(
			res => {
				res.json().then(data => {
					let d = Object.keys(data).map(key => {
						return Object.assign(data[key], { id: key });
					});
					console.log(d);
					this.setState(
						{
							post: d[0]
						},
						() => console.log(this.state)
					);
				});
			}
		);
	}

	handleAdd = () => {
		let postData = {
			name: 'test',
			body: `lorem lorem
			lorem
			
			lorem
			`
		};
		const url = 'https://note-taking-app-b6189.firebaseio.com/posts.json';
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
	};
	render() {
		let body;
		if (this.state.post === null) {
			body = 'loading';
		} else {
			body = this.state.post.body;
		}
		return (
			<div>
				<button onClick={this.handleAdd}>Click to add posts</button>
				<TextEditor content={body} />
			</div>
		);
	}
}

export default App;
