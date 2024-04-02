import React from "react";

import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Выберите начало периода"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="Выберите конец периода"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateFilter;
