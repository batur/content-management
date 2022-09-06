import React from 'react';

import {Modal as MuiModal, Container, Box, Typography, IconButton} from '@mui/material';
import {useAtom} from 'jotai';
import ModalAtom from 'store/Modal';
import {Close} from '@mui/icons-material';
import TextEditor from 'components/TextEditor';

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
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box
          dangerouslySetInnerHTML={{
            __html: modalState.content
          }}
        />
        <Box>{modalState.type === 'add' && <TextEditor />}</Box>
      </Container>
    </MuiModal>
  );
};

export default React.memo(Modal);
