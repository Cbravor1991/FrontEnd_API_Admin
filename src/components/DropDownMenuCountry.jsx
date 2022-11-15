import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

function DropDownMenuCountry(props) {
  const [selected, setSelected] = useState(props.selected ? props.selected : "");

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setPais(event.target.value);
  };

  return (
    <FormControl sx={{width: '100%'}}>
      <InputLabel>Pais</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        <MenuItem value={"Argentina"}>Argentina</MenuItem>
        <MenuItem value={"Brasil"}>Brasil</MenuItem>
        <MenuItem value={"España"}>España</MenuItem>
        <MenuItem value={"México"}>México</MenuItem>
        <MenuItem value={"Estados Unidos"}>Estados Unidos</MenuItem>
        <MenuItem value={"Uruguay"}>Uruguay</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropDownMenuCountry;
