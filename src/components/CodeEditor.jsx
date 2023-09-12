import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import "../App.css"

const CodeEditor = ({ code, onChange }) => {

    monaco.editor.defineTheme("myCustomTheme", {
        base: "vs-dark",
        inherit: true, // Do not inherit from the base theme
        rules: [
          {
            token: "comment",
            foreground: "ffa500",
            fontStyle: "italic underline",
          },
          { token: "comment.js", foreground: "008800", fontStyle: "bold" },
          { token: "comment.css", foreground: "0000ff" },
        ],
        colors: {
          "editor.foreground": "#FFFFFF",
          "editor.background": "#050038",
        },
      });
      
    
  
  const editorOptions = {
    // selectOnLineNumbers: true,
    // roundedSelection: false,
    // readOnly: false,
    // cursorStyle: 'line',
    // automaticLayout: true,
  };

  return (
    <MonacoEditor
      height="500"
      width="500"
      language="html" 
      theme= "myCustomTheme" 
      value={code}
      options={editorOptions}
      onChange={onChange}
    />
  );
};

export default CodeEditor;