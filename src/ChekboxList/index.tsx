import React from "react";
import { Dispatch, SetStateAction } from "react";

import { Box, Checkbox, FormControlLabel } from "@mui/material";

import { currencyType } from "../App";

interface CheckboxProps {
  checkCurrent: string[];
  setCheckCurrent: Dispatch<SetStateAction<currencyType[]>>;
}

function CheckboxList({ checkCurrent, setCheckCurrent }: CheckboxProps) {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckCurrent((current) => {
      if (checked) {
        return [...current, name];
      } else {
        return current.filter((item) => item !== name);
      }
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        label="Евро"
        control={
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
            onChange={handleChange}
            name="eur"
            checked={checkCurrent.includes("eur")}
          />
        }
      />
      <FormControlLabel
        label="Доллар"
        control={
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
            onChange={handleChange}
            checked={checkCurrent.includes("usd")}
            name="usd"
          />
        }
      />
      <FormControlLabel
        label="Юань"
        control={
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
            onChange={handleChange}
            checked={checkCurrent.includes("cny")}
            name="cny"
          />
        }
      />
    </Box>
  );
}

export default CheckboxList;
