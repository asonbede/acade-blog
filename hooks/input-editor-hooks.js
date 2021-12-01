import React, { useState, useEffect } from "react";

import {
  convertToRaw,
  convertFromRaw,
  EditorState,
  AtomicBlockUtils,
} from "draft-js";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const serverContentInputHandler = (contentFromServer) => {
    useEffect(() => {
      if (contentFromServer) {
        //setUrl(blog.url);

        setValue(contentFromServer);
      }
    }, [contentFromServer]);
  };

  return {
    type,
    value,
    onChange,
    setValue,
    serverContentInputHandler,
  };
};

export const useEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // let url;
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const url = JSON.stringify(convertToRaw(editorState.getCurrentContent())); //JSON.stringify()

  const serverContentHandler = (contentFromServer) => {
    useEffect(() => {
      if (contentFromServer) {
        //setUrl(blog.url);

        const content = convertFromRaw(JSON.parse(contentFromServer));
        if (content) {
          setEditorState(() =>
            EditorState.push(editorState, content, "remove-range")
          );
        }
      }
    }, [contentFromServer]);
  };

  return {
    // wrapperClassName: "wrapper-class",
    // editorClassName: "editor-class",
    // toolbarClassName: "toolbar-class",

    url,
    editorState,
    serverContentHandler,
    onEditorStateChange: handleEditorChange,
    // toolbar: {
    //   inline: { inDropdown: true },
    //   list: { inDropdown: true },
    //   textAlign: { inDropdown: true },
    //   link: { inDropdown: true },
    //   history: { inDropdown: true },
    // },
  };
};

//handle blog image
export const handleImageInsert = (
  editorState,
  imageBlog,
  onEditorStateChange
) => {
  const newEditorState = insertImage(editorState, imageBlog);
  onEditorStateChange(newEditorState);
};

const insertImage = (editorState, imageBlog) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    "IMAGE",
    "IMMUTABLE",
    { src: imageBlog }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
};
