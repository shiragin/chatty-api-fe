import React from 'react';
import {
  Autocomplete,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useIdeaContext } from '../utils/IdeaContext';

function Search(): JSX.Element {
  const {
    search,
    setSearch,
    searchIdeas,
    savedIdeas,
    setShowSaved,
    showSaved,
  } = useIdeaContext();

  function searchHandler() {
    setShowSaved!(false);
    const prompt = `I'm writing a story and I don't know how to continue. Right now in my story ${
      search?.prompt
    }. 
    Please give me ideas how to continue the next scene. 
    Make it ${search?.dark} dark, with ${
      search?.happyEnding
    }, and I also want the following elements: ${search?.tags.join(
      ', '
    )} to be in the story. Don't write the entire story, I want just the next scene.`;
    searchIdeas!(prompt);
  }

  return (
    <Grid
      container
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='50vh'
      spacing={2}
    >
      <Grid item xs={8} sx={{ width: '100%', margin: '0 0 2rem' }}>
        <Typography variant='h3' align='center' color='secondary'>
          What should happen next?
        </Typography>
      </Grid>
      <Grid item xs={8} sx={{ width: '100%', margin: '0' }}>
        <Typography variant='h5' sx={{ fontWeight: 'light' }}>
          Enter current scene
        </Typography>
      </Grid>
      <Grid item xs={8} sx={{ width: '100%', margin: '0 0 1rem' }}>
        <TextField
          fullWidth={true}
          placeholder='Describe the scene in your story that has you stumped'
          multiline
          maxRows={4}
          variant='standard'
          color='secondary'
          inputProps={{ style: { fontSize: 18, fontWeight: 300 } }}
          onChange={(e) => {
            if (setSearch) setSearch({ ...search!, prompt: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={8} m={6} sx={{ width: '100%', margin: '1rem 0' }}>
        <InputLabel sx={{ fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
          Make it dark?
        </InputLabel>
        <Select
          fullWidth={true}
          value={search?.dark}
          onChange={(e) => {
            if (setSearch) setSearch({ ...search!, dark: e.target.value });
          }}
          label='dark'
        >
          <MenuItem value={'not'}>No</MenuItem>
          <MenuItem value={'just a little'}>Just a tiny bit</MenuItem>
          <MenuItem value={'very'}>Very</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={8} m={6} sx={{ width: '100%', margin: '1rem 0' }}>
        <InputLabel sx={{ fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
          Want a happy ending?
        </InputLabel>
        <Select
          fullWidth={true}
          value={search?.happyEnding}
          onChange={(e) => {
            setSearch!({ ...search!, happyEnding: e.target.value });
          }}
          label='happy-ending'
        >
          <MenuItem value={'no happy ending'}>No</MenuItem>
          <MenuItem value={'a bittersweet ending'}>Somewhat</MenuItem>
          <MenuItem value={'a happy ending'}>Yes</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={8} sx={{ width: '100%', margin: '0 0 2rem' }}>
        <InputLabel sx={{ fontSize: '1.2rem', margin: '1rem 0' }}>
          Anything else?
        </InputLabel>
        <Autocomplete
          fullWidth
          multiple
          options={search!.tags}
          freeSolo
          onChange={(e: React.SyntheticEvent) => {
            if ((e.target as HTMLInputElement).value)
              setSearch!({
                ...search!,
                tags: [...search!.tags, (e.target as HTMLInputElement).value],
              });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              value={search?.tags}
              placeholder='Press enter to add tags'
            />
          )}
        />
      </Grid>
      <Grid item xs={8} m={6} sx={{ width: '100%', margin: '1rem 0 0' }}>
        <Button
          fullWidth={true}
          variant='contained'
          color='secondary'
          onClick={searchHandler}
          size='large'
          sx={{ minWidth: '12.9rem' }}
        >
          Get new ideas
        </Button>
      </Grid>
      <Grid item xs={8} m={6} sx={{ width: '100%', margin: '1rem 0 3rem 0' }}>
        {savedIdeas?.length ? (
          <Button
            fullWidth={true}
            variant='contained'
            color='secondary'
            onClick={() => setShowSaved!(!showSaved)}
            size='large'
            sx={{ minWidth: '12.9rem' }}
          >
            {showSaved ? 'View latest search' : 'View saved ideas'}
          </Button>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
}

export default Search;
