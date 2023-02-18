import { Container, Grid, LinearProgress } from '@mui/material';
import Idea from '../components/Idea';
import IdeaModal from '../components/IdeaModal';
import Search from '../components/Search';
import { useIdeaContext } from '../utils/IdeaContext';

function Home(): JSX.Element {
  const { isLoading, ideas, showSaved, savedIdeas } = useIdeaContext();

  return (
    <Container
      maxWidth='lg'
      sx={{ width: '100%', margin: '2rem auto', flexGrow: 1 }}
    >
      <Search />
      {isLoading && <LinearProgress color='secondary' />}
      {!isLoading && !showSaved && (
        <Grid
          container
          justifyContent='center'
          // xs={10}
          // sm={12}
          margin='0 auto'
          gap={3}
        >
          {ideas?.map((idea) => (
            <Grid
              item
              key={idea.id}
              xs={10}
              sm={5}
              md={4}
              lg={3}
              sx={{ padding: 0 }}
            >
              <Idea idea={idea} />
            </Grid>
          ))}
        </Grid>
      )}
      {!isLoading && showSaved && (
        <Grid
          container
          justifyContent='center'
          // xs={10}
          // sm={12}
          margin='0 auto'
          gap={3}
        >
          {savedIdeas?.map((idea) => (
            <Grid
              item
              key={idea.id}
              xs={10}
              sm={5}
              md={4}
              lg={3}
              sx={{ padding: 0 }}
            >
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
