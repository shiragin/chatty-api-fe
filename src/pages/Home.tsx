import { Container, Grid, LinearProgress } from '@mui/material';
import Idea from '../components/Idea';
import IdeaModal from '../components/IdeaModal';
import Search from '../components/Search';
import { useIdeaContext } from '../utils/IdeaContext';

function Home(): JSX.Element {
  const { isLoading, ideas, showSaved, savedIdeas } = useIdeaContext();

  return (
    <Container maxWidth='lg' sx={{ width: '100%', margin: '2rem auto' }}>
      <Search />
      {isLoading && <LinearProgress color='secondary' />}
      {!isLoading && !showSaved && (
        <Grid container justifyContent='center' spacing={4}>
          {ideas?.map((idea, index) => (
            <Grid key={index} item xs={4}>
              <Idea idea={idea} />
            </Grid>
          ))}
        </Grid>
      )}
      {!isLoading && showSaved && (
        <Grid container justifyContent='center' spacing={4}>
          {savedIdeas?.map((idea, index) => (
            <Grid key={index} item xs={4}>
              <Idea idea={idea} />
            </Grid>
          ))}
        </Grid>
      )}
      <IdeaModal />
    </Container>
  );
}

export default Home;
