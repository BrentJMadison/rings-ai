'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_CHARACTERS, Character, CharactersResponse } from '@/lib/queries';
import debounce from 'lodash/debounce';

export default function CharacterAutocomplete() {
  const [options, setOptions] = useState<Character[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState<Character | null>(null);

  const [searchCharacters, { loading, data, error }] = useLazyQuery<CharactersResponse>(
    SEARCH_CHARACTERS
  );

  // Handle data updates using useEffect
  useEffect(() => {
    if (data?.characters?.results) {
      setOptions(data.characters.results);
    } else if (error) {
      setOptions([]);
    }
  }, [data, error]);

  // Debounce search to avoid too many API calls
  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        if (searchTerm.trim().length > 0) {
          searchCharacters({
            variables: { name: searchTerm },
          });
        } else {
          setOptions([]);
        }
      }, 300),
    [searchCharacters]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = (_event: React.SyntheticEvent, value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleChange = (_event: React.SyntheticEvent, value: Character | null) => {
    setSelectedValue(value);
    if (value) {
      setInputValue(value.name);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Autocomplete
        freeSolo
        options={options}
        loading={loading}
        value={selectedValue}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          return option.name;
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Rick and Morty Characters"
            placeholder="Type a character name..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                py: 1,
              }}
            >
              <Avatar
                src={option.image}
                alt={option.name}
                sx={{ width: 48, height: 48 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  {option.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.species} • {option.status}
                </Typography>
              </Box>
            </Box>
          </li>
        )}
        PaperComponent={(props) => (
          <Paper {...props} elevation={8} />
        )}
        noOptionsText={
          inputValue.trim().length === 0
            ? 'Start typing to search...'
            : 'No characters found'
        }
      />

      {selectedValue && (
        <Box
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              src={selectedValue.image}
              alt={selectedValue.name}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h5" gutterBottom>
                {selectedValue.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Species: {selectedValue.species}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Status: {selectedValue.status}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
