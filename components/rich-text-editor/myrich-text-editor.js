import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
// import { Editor } from "react-draft-wysiwyg";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyRichEditor = ({
  useEditorMainBlog,
  readOnly,
  toolbarOnFocus,
  toolbarPresent,
  smallHeight,
}) => {
  // const toolbarStyleObj = { display: "block" };
  // const toolbarStyleObjIntro = { display: "none" };
  // const Editor = useMemo(() => {
  //   return dynamic(
  //     () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  //     { ssr: false }
  //   );
  // }, []);
  return (
    <Editor
      onEditorStateChange={useEditorMainBlog.onEditorStateChange}
      editorState={useEditorMainBlog.editorState}
      // {...useEditorMainBlog}
      toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
      readOnly={readOnly}
      toolbarOnFocus={toolbarOnFocus}
      wrapperClassName={smallHeight ? "wrapper-class" : "wrapper-class-big"}
      editorClassName={smallHeight ? "editor-small-class" : "editor-class"}
      toolbarClassName={toolbarPresent ? "toolbar-class" : "remove-toolbar"}
      // toolbarStyle={toolbarPresent ? toolbarStyleObj : toolbarStyleObjIntro}
    />
  );
};
export default MyRichEditor;
