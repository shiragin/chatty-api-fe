import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
// import Icon from '@mui/material/Icon';
// import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useIdeaContext } from '../utils/IdeaContext';

const style = {
  box: {
    position: 'absolute' as 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #ce93d8',
    boxShadow: 24,
    p: 5,
  },
  icon: {
    backgroundColor: '#ce93d8',
    fill: '#333',
    borderRadius: '50%',
    position: 'absolute',
    top: '-2%',
    right: '-3%',
    fontSize: '3rem',
    rotate: '45deg',
    transition: '0.2s ease-in',
    cursor: 'pointer',
    '&:hover': {
      scale: '1.1',
    },
  },
};

function IdeaModal() {
  const { modalShow, setModalShow, saveIdeasForLater } = useIdeaContext();

  const { title, tags, body } = modalShow!.content;

  function closeHandler(e: React.MouseEvent) {
    e.stopPropagation();
    console.log('close');
    setModalShow!({ ...modalShow!, show: false });
  }

  function saveHandler() {
    saveIdeasForLater!({ title, tags, body });
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
          <AddCircleRoundedIcon
            sx={style.icon}
            onClick={(e) => closeHandler(e)}
          />
          <Typography variant='h3' color='secondary'>
            {title}
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.1rem',
              fontWeight: 600,
              marginTop: '1.6rem',
              backgroundColor: '#eee',
              color: '#333',
              display: 'inline-block',
              padding: '0.2rem 0.6rem',
              borderRadius: '0.375rem',
            }}
          >
            {tags}
          </Typography>
          <Typography
            sx={{
              marginTop: '2rem',
              whiteSpace: 'pre-wrap',
              fontSize: '1.1rem',
            }}
          >
            {body}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

export default IdeaModal;
