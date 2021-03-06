import React, {Component} from 'react'

// Components
import {Editor, EditorState} from 'draft-js'

class BittEditor extends Component {
  constructor() {
    super()

    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.onChange = (editorState) => this.setState({editorState})
  }
  render() {
    return (
      <Editor
        autoFocus="true"
        editorState={this.state.editorState}
        onChange={this.onChange}
      />
    )
  }
}

export default BittEditor
