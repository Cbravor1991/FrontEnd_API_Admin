import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

function DropDownMenuProvince(props) {
  const [selected, setSelected] = useState(props.selected ? props.selected : "");

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setProvincia(event.target.value);
    props.passFilters();
  };

  return (
    <FormControl sx={{width: '100%'}}>
      <InputLabel>Province</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        <MenuItem value={"Buenos Aires"}>Buenos Aires</MenuItem>
        <MenuItem value={"CABA"}>CABA</MenuItem>
        <MenuItem value={"Cordoba"}>Cordoba</MenuItem>
        <MenuItem value={"Santa Fe"}>Santa Fe</MenuItem>
        <MenuItem value={"Tierra del Fuego"}>Tierra del Fuego</MenuItem>
        <MenuItem value={"Corrientes"}>Corrientes</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropDownMenuProvince;
