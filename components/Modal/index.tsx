import React from 'react';
import dynamic from 'next/dynamic';

import {Modal as MuiModal, Container, Box, Typography, IconButton} from '@mui/material';
import {useAtom} from 'jotai';
import ModalAtom from 'store/Modal';
import {Close} from '@mui/icons-material';

const TextEditor = dynamic(() => import('components/TextEditor'), {
  ssr: false
});
const Modal = () => {
  const [modalState, setModalState] = useAtom(ModalAtom);

  const handleClose = () => {
    setModalState({
      open: false,
      title: '',
      content: '',
      type: ''
    });
  };
  return (
    <MuiModal
      open={modalState.open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography component="h3" variant="h5">
            {modalState.title}
          </Typography>
          <IconButton color={'error'} onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box
          dangerouslySetInnerHTML={{
            __html: modalState.content
          }}
        />
        <Box>
          {modalState.type === 'add' && (
            <React.Suspense fallback={`Loading...`}>
              <TextEditor />
            </React.Suspense>
          )}
        </Box>
      </Container>
    </MuiModal>
  );
};

export default Modal;
