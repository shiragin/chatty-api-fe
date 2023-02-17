import { Button, Card, Paper, Typography } from '@mui/material';
import { IIdea } from '../interfaces/IdeaInterfaces';
import { useIdeaContext } from '../utils/IdeaContext';

function Idea({ idea }: { idea: IIdea }) {
  const { modalShow, setModalShow } = useIdeaContext();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 2rem',
        width: '350px',
        minHeight: '250px',
        gap: '2rem',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Typography
        variant='h6'
        sx={{ fontSize: '1.1rem', fontWeight: '300', whiteSpace: 'pre-wrap' }}
      >
        {idea.body.split(' ').slice(0, 30).join(' ')}
      </Typography>
      <Button
        color='secondary'
        onClick={() => {
          console.log(modalShow);
          setModalShow!({ show: true, content: idea });
        }}
      >
        Read More
      </Button>
    </Card>
  );
}

export default Idea;
