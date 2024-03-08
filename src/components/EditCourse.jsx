import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

/**
 * EditCourse component provides a rich text editor for editing course content.
 */
const EditCourse = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  /**
   * handleSave function is called when the Save button is clicked.
   * It logs the plain text content of the editor to the console.
   *
   * @param {Object} e - The event object
   */
  const handleSave = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    console.log("Form submitted", contentState.getPlainText());
  };

   /**
   * handleEditorChange function updates the editor state when the content changes.
   *
   * @param {EditorState} newEditorState - The new editor state
   */
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  /**
   * handleBoldClick function toggles the bold formatting in the editor.
   */
  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  return (
    <div>
      <Editor editorState={editorState} onChange={handleEditorChange} />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditCourse;
