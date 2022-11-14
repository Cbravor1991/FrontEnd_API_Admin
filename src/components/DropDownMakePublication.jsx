import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState } from 'react';

function DropDownMenuMakePublication(props) {
  const [selected, setSelected] = useState(props.selected ? props.selected : '');

  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setFunction(event.target.value);
  };

  return (
    <FormControl sx={{width: '100%'}}>
      <InputLabel>{props.name}</InputLabel>
      <Select value={selected} onChange={selectionChangeHandler}>
        {props.values.map((value, index) => (
            <MenuItem key={index} value={value}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDownMenuMakePublication;