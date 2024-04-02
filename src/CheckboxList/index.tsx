import React from "react";
import { Dispatch, SetStateAction } from "react";

import { Box, Checkbox, FormControlLabel } from "@mui/material";

import { currencyType } from "../App";

interface CheckboxProps {
  arrayCurrency: string[];
  setArrayCurrency: Dispatch<SetStateAction<currencyType[]>>;
}

const CheckboxList = ({ arrayCurrency, setArrayCurrency }: CheckboxProps) => {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setArrayCurrency((oldArrayCurrency) => {
      if (checked) {
        return [...oldArrayCurrency, name];
      }
      return oldArrayCurrency.filter((item) => item !== name);
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
            checked={arrayCurrency.includes("eur")}
          />
        }
      />
      <FormControlLabel
        label="Доллар"
        control={
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
            onChange={handleChange}
            checked={arrayCurrency.includes("usd")}
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
            checked={arrayCurrency.includes("cny")}
            name="cny"
          />
        }
      />
    </Box>
  );
};

export default CheckboxList;
