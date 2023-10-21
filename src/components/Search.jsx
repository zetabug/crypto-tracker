import React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

function Search({search,setSearch}) {
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          variant="outlined"
          placeholder="Search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </Box>
    );
  }
  
  export default Search;
  