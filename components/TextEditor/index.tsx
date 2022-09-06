import React, {useEffect, useState} from 'react';
import 'quill/dist/quill.snow.css';

import {useQuill} from 'react-quilljs';

import {Box, Button} from '@mui/material';
import {api} from 'hooks';
import {useAtom} from 'jotai';
import ModalAtom from 'store/Modal';

const TextEditor = () => {
  const {quill, quillRef} = useQuill();

  const {mutate, isLoading} = api.usePostContent();
  const [modalState, setModalState] = useAtom(ModalAtom);

  const [isPostButtonDisabled, setIsPostButtonDisabled] = useState(true);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setIsPostButtonDisabled(quill.getLength() === 1);
      });
    }
  }, [quill]);

  const handlePost = () => {
    mutate(quill.root.innerHTML);
    quill.setText('');
    modalState.open &&
      setModalState({
        open: false,
        title: '',
        content: '',
        type: ''
      });
  };

  const handleClose = () => {
    setModalState({
      open: false,
      title: '',
      content: '',
      type: ''
    });
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
        <Button variant="contained" size="medium" onClick={handlePost} disabled={isPostButtonDisabled || isLoading}>
          Post
        </Button>
      </Box>
    </>
  );
};

export default React.memo(TextEditor);
