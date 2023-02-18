import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useIdeaContext } from '../utils/IdeaContext';
import { useEffect, useState } from 'react';
import { style } from '../utils/IdeaStyles';

function IdeaModal() {
  const { modalShow, setModalShow, saveIdeasForLater, savedIdeas, showSaved } =
    useIdeaContext();

  const { id, title, tags, body } = modalShow!.content;

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!savedIdeas?.find((idea) => idea.id === id)) setSaved(false);
    else setSaved(true);
  }, [saved, savedIdeas, showSaved, modalShow]);

  function closeHandler(e: React.MouseEvent) {
    e.stopPropagation();
    setModalShow!({ ...modalShow!, show: false });
  }

  function saveHandler() {
    saveIdeasForLater!({ id, title, tags, body });
  }

  return (
    <Modal
      sx={{ overflowY: 'scroll' }}
      disableScrollLock={false}
      open={modalShow!.show}
      onClose={closeHandler}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalShow!.show}>
        <Box sx={style.box}>
          <CancelIcon sx={style.icon} onClick={(e) => closeHandler(e)} />
          <Typography variant='h4' color='secondary'>
            {title}
          </Typography>
          <Typography variant='h6' sx={style.tags}>
            {tags}
          </Typography>
          <Typography sx={style.text}>{body}</Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              onClick={saveHandler}
              disabled={saved}
            >
              {saved ? 'Idea Saved' : 'Save Idea'}
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default IdeaModal;
