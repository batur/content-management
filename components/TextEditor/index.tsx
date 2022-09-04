import React from 'react';
import 'quill/dist/quill.snow.css';

import {useQuill} from 'react-quilljs';
import {Box, Button} from '@mui/material';

const TextEditor = () => {
  const {quill, quillRef} = useQuill();

  console.log(quill); // undefined > Quill Object
  console.log(quillRef); //

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  return (
    <>
      <Box>
        <Box>
          <Box ref={quillRef} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          marginY: 2
        }}
      >
        <Button variant="contained" size="large" color="error">
          Discard
        </Button>
        <Button variant="contained" size="large">
          Post
        </Button>
      </Box>
    </>
  );
};

export default TextEditor;
