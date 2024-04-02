import React from "react";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import { calculationInterimDates, convertRubleTo } from "./utils";
import CheckboxList from "./ChekboxList";
import DatePickerViews from "./DataPicker";
import LineChart from "./LineChart";

export type currencyType = "eur" | "usd" | "cny";
export interface DataObject {
  month: string;
  eur: number;
  usd: number;
  cny: number;
}

function App() {
  const [checkCurrent, setCheckCurrent] = useState<Array<currencyType>>([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [interimDates, setInterimDates] = useState<string[]>([]);
  const [data, setData] = useState<DataObject[]>([]);
  const [request, setRequest] = useState(0);

  useEffect(() => {
    calculationInterimDates(startDate, endDate, setInterimDates);
  }, [endDate, startDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = interimDates.map(async (date) => {
          setRequest((prevCount) => prevCount + 1);
          const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/rub.json`;
          const response = await axios.get(url);
          const rates = response.data;
          const { usd, eur, cny } = rates["rub"];
          const USD = Number(convertRubleTo({ rubleRate: usd }));
          const EUR = Number(convertRubleTo({ rubleRate: eur }));
          const CNY = Number(convertRubleTo({ rubleRate: cny }));
          return {
            month: date,
            eur: EUR,
            usd: USD,
            cny: CNY,
          };
        });

        const data = await Promise.all(dataPromises);
        data.sort(
          (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
        );
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
