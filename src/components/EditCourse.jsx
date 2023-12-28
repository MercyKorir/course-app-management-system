import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

const EditCourse = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSave = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    console.log("Form submitted", contentState.getPlainText());
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

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
