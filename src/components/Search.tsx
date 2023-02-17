import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useIdeaContext } from '../utils/IdeaContext';

function Search(): JSX.Element {
  const { search, setSearch, searchIdeas, savedIdeas, setShowSaved } =
    useIdeaContext();

  function searchHandler() {
    const prompt = `I'm writing a story and I don't know how to continue. Right now in my story ${
      search?.prompt
    }. What should happen next? Make it ${search?.dark} dark, with ${
      search?.happyEnding
    }, and I also want the following elements: ${search?.tags.join(
      ', '
    )} to be in the story.`;
    searchIdeas!(prompt);
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='50vh'
      gap={2}
    >
      <Typography variant='h2' align='center' gutterBottom>
        What should happen next?
      </Typography>
      <Typography variant='h5' sx={{ fontWeight: 'light' }} gutterBottom>
        Enter current scenario
      </Typography>
      <TextField
        placeholder='Describe the scene in your story that has you stumped'
        multiline
        maxRows={4}
        variant='standard'
        color='secondary'
        sx={{ width: '60%', marginBottom: '2rem' }}
        inputProps={{ style: { fontSize: 20, fontWeight: 300 } }}
        onChange={(e) => {
          if (setSearch) setSearch({ ...search!, prompt: e.target.value });
        }}
      />
      <div
        style={{
          width: '60%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <InputLabel sx={{ fontSize: '1.2rem' }}>Make it dark?</InputLabel>
          <Select
            fullWidth
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
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <InputLabel sx={{ fontSize: '1.2rem' }}>
            Want a happy ending?
          </InputLabel>
          <Select
            fullWidth
            value={search?.happyEnding}
            onChange={(e) => {
              if (setSearch)
                setSearch({ ...search!, happyEnding: e.target.value });
            }}
            label='happy-ending'
          >
            <MenuItem value={'no happy ending'}>No</MenuItem>
            <MenuItem value={'a bittersweet ending'}>Somewhat</MenuItem>
            <MenuItem value={'a happy ending'}>Yes</MenuItem>
          </Select>
        </div>
      </div>
      <div
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <InputLabel sx={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Anything else?
        </InputLabel>
        <Autocomplete
          fullWidth
          multiple
          options={search!.tags}
          freeSolo
          onChange={(e: React.SyntheticEvent) => {
            if ((e.target as HTMLInputElement).value && setSearch)
              setSearch({
                ...search!,
                tags: [...search!.tags, (e.target as HTMLInputElement).value],
              });
          }}
          renderInput={(params) => (
            <TextField {...params} value={search?.tags} />
          )}
        />
      </div>
      <div style={{ display: 'flex', gap: '2rem', margin: '2rem 0 4rem' }}>
        <Button
          variant='contained'
          color='secondary'
          onClick={searchHandler}
          size='large'
        >
          Get ideas
        </Button>
        {savedIdeas?.length ? (
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setShowSaved!(true)}
            size='large'
          >
            View saved ideas
          </Button>
        ) : (
          <></>
        )}
      </div>
    </Box>
  );
}

export default Search;
