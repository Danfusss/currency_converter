import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import dayjs from "dayjs";

import { calculationInterimDates } from "./utils";
import CheckboxList from "./CheckboxList";
import DateFilter from "./DataPicker";
import LineChart from "./LineChart";

import dayjsPluginUTC from "dayjs-plugin-utc";

import getCurrency from "./api/gettingData";
import { DataObject, currencyType } from "./types";

dayjs.extend(dayjsPluginUTC);
const dayjsWithUTC = dayjs as unknown as typeof dayjs & {
  utc: typeof dayjsPluginUTC;
};

const defaultEndDate = dayjsWithUTC.utc().startOf("day");
const defaultStartDate = dayjsWithUTC.utc().subtract(6, "day").startOf("day");

const App = () => {
  const [arrayCurrency, setArrayCurrency] = useState<Array<currencyType>>([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [countDays, setCuntDays] = useState<string[]>([]);
  const [data, setData] = useState<DataObject[]>([]);
  const [countRequest, setCountRequest] = useState(0);

  useEffect(() => {
    if (endDate && endDate) {
      calculationInterimDates(startDate, endDate, setCuntDays);
    }
  }, [endDate, startDate]);

  useEffect(() => {
    getCurrency(setCountRequest, countDays, setData);
  }, [countDays]);

  return (
    // Что бы не задавать для бади)
    <Box sx={{ width: "100%", height: "90vh" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "30vw",
            height: "40vh",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          <CheckboxList
            arrayCurrency={arrayCurrency}
            setArrayCurrency={setArrayCurrency}
          />
          <DateFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <Typography variant="h5">
            {`Число запросов в API: ${countRequest}`}
          </Typography>
        </Box>
        <Box sx={{ width: "45vw", height: "50vh" }}>
          <LineChart data={data} checkCurrent={arrayCurrency} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
