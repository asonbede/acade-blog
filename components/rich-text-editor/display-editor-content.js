import React, { useState, useEffect } from "react";
import MyRichEditor from "./myrich-text-editor";

import { useEditor } from "../../hooks/input-editor-hooks";

const DisplayEditorContent = ({ contentFromServer, smallHeight }) => {
  const useEditorMainBlog = useEditor();
  useEditorMainBlog.serverContentHandler(contentFromServer);

  return (
    <>
      <MyRichEditor
        readOnly={true}
        toolbarOnFocus={true}
        useEditorMainBlog={useEditorMainBlog}
        smallHeight={smallHeight}
      />
    </>
  );
};
export default DisplayEditorContent;
