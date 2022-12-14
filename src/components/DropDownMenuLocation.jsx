import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

function DropDownMenuLocation(props) {
  const [selected, setSelected] = useState(props.selected ? props.selected : "");

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setLocalidad(event.target.value);

  };

  return (
    <FormControl sx={{width: '100%'}}>
      <InputLabel>Localidad</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        <MenuItem value={""}></MenuItem>
        <MenuItem value={"Buenos Aires"}>Buenos Aires</MenuItem>
        <MenuItem value={"Córdoba"}>Córdoba</MenuItem>
        <MenuItem value={"Rosario"}>Rosario</MenuItem>
        <MenuItem value={"Mar Del Plata"}>Mar Del Plata</MenuItem>
        <MenuItem value={"Ushuaia"}>Ushuaia</MenuItem>
        <MenuItem value={"Tigre"}>Tigre</MenuItem>
        <MenuItem value={"Villa María"}>Villa María</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropDownMenuLocation;
