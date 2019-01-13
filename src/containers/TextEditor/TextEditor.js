import React, { Component } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';

class TextEditor extends Component {
	state = {
		editorState: EditorState.createEmpty()
	};

	componentWillReceiveProps(newProps) {
		console.log(newProps.content);
		let plaintext = newProps.content;
		let content = ContentState.createFromText(plaintext);
		this.setState({
			editorState: EditorState.createWithContent(content)
		});
	}

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
