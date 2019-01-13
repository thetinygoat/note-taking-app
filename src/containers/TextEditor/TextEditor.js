import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

class TextEditor extends Component {
	state = {
		editorState: EditorState.createEmpty()
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
	}
	render() {
		return (
			<div style={styles.editor} onClick={this.setEditorFocus}>
				<Editor
					ref={this.setEditor}
					editorState={this.state.editorState}
					onChange={this.handleChange}
				/>
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
