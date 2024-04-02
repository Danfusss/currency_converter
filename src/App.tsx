import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import { calculationInterimDates, convertRubleTo } from "./utils";
import CheckboxList from "./ChekboxList";
import DatePickerViews from "./DataPicker";
import LineChart from "./LineChart";

import dayjsPluginUTC from "dayjs-plugin-utc";
import gettingData from "./api/gettingData";
dayjs.extend(dayjsPluginUTC);
const dayjsWithUTC = dayjs as unknown as typeof dayjs & {
  utc: typeof dayjsPluginUTC;
};

export type currencyType = "eur" | "usd" | "cny";
export interface DataObject {
  month: string;
  eur: number;
  usd: number;
  cny: number;
}

function App() {
  const originalStartingTime = dayjsWithUTC.utc().startOf("day");
  const originalEndingTime = dayjsWithUTC
    .utc()
    .subtract(6, "day")
    .startOf("day");
  const [checkCurrent, setCheckCurrent] = useState<Array<currencyType>>([]);
  const [startDate, setStartDate] = useState(originalEndingTime);
  const [endDate, setEndDate] = useState(originalStartingTime);
  const [interimDates, setInterimDates] = useState<string[]>([]);
  const [data, setData] = useState<DataObject[]>([]);
  const [request, setRequest] = useState(0);

  useEffect(() => {
    calculationInterimDates(startDate, endDate, setInterimDates);
  }, [endDate, startDate]);

  useEffect(() => {
    gettingData(interimDates, setRequest, setData);
  }, [interimDates]);

  return (
    <Box
      sx={{
        width: "80vw",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        marginLeft: "15rem",
        marginTop: "5rem",
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
          checkCurrent={checkCurrent}
          setCheckCurrent={setCheckCurrent}
        />
        <DatePickerViews
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <Typography variant="h5">Число запросов в API: {request}</Typography>
      </Box>
      <LineChart data={data} checkCurrent={checkCurrent} />
    </Box>
  );
}

export default App;
