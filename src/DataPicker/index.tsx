import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import React from "react";
import { Box } from "@mui/material";

const DatePickerViews = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "15vw",
            height: "15vh",
            justifyContent: "space-between",
          }}
        >
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
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerViews;
