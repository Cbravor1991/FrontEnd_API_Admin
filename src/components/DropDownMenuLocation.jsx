import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

function DropDownMenuLocation(props) {
  const [selected, setSelected] = useState(props.selected ? props.selected : '');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setProvincia(event.target.value);
  };

  return (
    <FormControl sx={{width: '100%'}}>
      <InputLabel>Ubicacion</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        <MenuItem value={1}>Buenos Aires</MenuItem>
        <MenuItem value={2}>CABA</MenuItem>
        <MenuItem value={3}>Cordoba</MenuItem>
        <MenuItem value={4}>Santa Fe</MenuItem>
        <MenuItem value={5}>Tierra del Fuego</MenuItem>
        <MenuItem value={5}>Corrientes</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropDownMenuLocation;