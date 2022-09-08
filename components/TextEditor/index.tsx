import React, {useEffect, useState} from 'react';
import 'quill/dist/quill.snow.css';

import {useQuill} from 'react-quilljs';

import {Box, Button} from '@mui/material';
import {closeModal} from 'store/Modal';
import {useDispatch} from 'react-redux';
import {AppDispatch} from 'store';
import {postContent} from 'store/Content';

const TextEditor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {quill, quillRef} = useQuill();
  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setIsPostButtonDisabled(quill.getLength() === 1);
      });
    }
  }, [quill]);

  const handlePost = () => {
    quill.setText('');
    dispatch(closeModal());
    dispatch(postContent(quill.root.innerHTML));
  };

  const handleClose = () => {
    dispatch(closeModal());
    quill.setText('');
  };
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
        <Button variant="contained" size="medium" color="error" onClick={handleClose}>
          Discard
        </Button>
        <Button variant="contained" size="medium" onClick={handlePost} disabled={isPostButtonDisabled}>
          Post
        </Button>
      </Box>
    </>
  );
};

export default React.memo(TextEditor);
