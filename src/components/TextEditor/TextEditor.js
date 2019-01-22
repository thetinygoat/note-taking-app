import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

class TextEditor extends Component {
	state = {
		editorState: EditorState.createEmpty(),
		body: null
	};
	handleChange = editorState => {
		this.setState({ editorState });
	};
	setEditor = editor => {
		this.editor = editor;
	};
	setEditorFocus = () => {
		if (this.editor) {
			this.editor.focus();
		}
	};

	componentDidMount() {
		this.setEditorFocus();
		fetch('https://note-taking-app-b6189.firebaseio.com/posts.json').then(
			res => {
				res.json().then(data => {
					let d = Object.keys(data).map(key => {
						return Object.assign(data[key], { id: key });
					});
					console.log(d);
					let plainText = d[0].body;
					let content = ContentState.createFromText(plainText);
					this.setState(
						{
							editorState: EditorState.createWithContent(content)
						},
						() => console.log(this.state)
					);
				});
			}
		);
	}
	render() {
		if (this.state)
			return (
				<div style={styles.editor} onClick={this.setEditorFocus}>
					<Editor
						ref={this.setEditor}
						editorState={this.state.editorState}
						onChange={this.handleChange}
					/>
					<button onClick={this.handleNewState}>choose state</button>
				</div>
			);
	}
}

const styles = {
	editor: {
		border: '1px solid gray',
		minHeight: '6em'
	}
};

export default TextEditor;
