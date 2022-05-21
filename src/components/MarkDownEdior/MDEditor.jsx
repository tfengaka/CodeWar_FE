import React from 'react';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MDView from './MDView';

const MDEditor = ({ value, style, onChange, onImageUpload }) => {
  const mdEditor = React.useRef(null);

  // const onImageUpload = (file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onload = (data) => {
  //       resolve(data.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };
  return (
    <Editor
      ref={mdEditor}
      className="mdeditor"
      style={style}
      value={value}
      onChange={({ text }) => onChange(text)}
      onImageUpload={(file) => onImageUpload(file)}
      renderHTML={(text) => <MDView source={text} />}
    />
  );
};

export default MDEditor;
