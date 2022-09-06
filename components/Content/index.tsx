import React, {FC} from 'react';

import {Card, CardContent, Typography, CardActions, IconButton, CardActionArea} from '@mui/material';
import {Person2, ThumbUpSharp} from '@mui/icons-material';
import {useSetAtom} from 'jotai';
import ModalAtom from 'store/Modal';

type Props = {
  content: Content;
};

const Content: FC<Props> = ({content}) => {
  const setModalAtom = useSetAtom(ModalAtom);

  const openModal = () => {
    setModalAtom({
      open: true,
      title: `${content.user.username}'s content`,
      content: content.content,
      type: 'show'
    });
  };
  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <Person2 />
        <Typography>{content.user.username}</Typography>
      </CardContent>
      <CardActionArea onClick={openModal}>
        <CardContent
          dangerouslySetInnerHTML={{
            __html: content.content.length > 100 ? content.content.slice(0, 100) + '...' : content.content
          }}
        ></CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <IconButton>
          <ThumbUpSharp />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default React.memo(Content);
