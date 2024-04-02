import axios from "axios";
import { convertRubleTo } from "../utils";
import React, { Dispatch, SetStateAction } from "react";
import { DataObject } from "../App";

const getCurrency = async (
  setRequest: Dispatch<SetStateAction<number>>,
  interimDates: string[],
  setData: Dispatch<SetStateAction<DataObject[]>>
): Promise<void> => {
  try {
    const dataPromises = interimDates.map(async (date) => {
      setRequest((prevCount) => prevCount + 1);
      try {
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
      } catch (error) {
        console.error(`Ошибка при получении данных для даты ${date}:`, error);
        console.log(`Дата ${date} не была найдена.`);
        return null;
      }
    });

    const data = await Promise.all(dataPromises);
    const filteredData = data.filter(
      (item): item is DataObject => item !== null
    );
    filteredData.sort(
      (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
    );
    setData(filteredData);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default getCurrency;
