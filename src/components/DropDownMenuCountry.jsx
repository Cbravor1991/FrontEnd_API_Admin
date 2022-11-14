import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

function DropDownMenuCountry(props) {
  const [selected, setSelected] = useState(props.selected ? props.selected : '');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setPais(event.target.value);
  };

  return (
    <FormControl sx={{width: '100%'}}>
      <InputLabel>Pais</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        <MenuItem value={1}>Argentina</MenuItem>
        <MenuItem value={2}>Brasil</MenuItem>
        <MenuItem value={3}>España</MenuItem>
        <MenuItem value={4}>México</MenuItem>
        <MenuItem value={5}>Estados Unidos</MenuItem>
        <MenuItem value={5}>Uruguay</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropDownMenuCountry;
