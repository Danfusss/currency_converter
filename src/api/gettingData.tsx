import axios from "axios";
import { convertCurrency } from "../utils";
import { Dispatch, SetStateAction } from "react";
import { DataObject } from "../types";

const getCurrency = async (
  setCountRequest: Dispatch<SetStateAction<number>>,
  interimDates: string[],
  setData: Dispatch<SetStateAction<DataObject[]>>
): Promise<void> => {
  try {
    const dataPromises = interimDates.map(async (date) => {
      setCountRequest((prevCount) => prevCount + 1);
      try {
        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/rub.json`;
        const response = await axios.get(url);
        const rates = response.data;
        const { usd, eur, cny } = rates["rub"];
        const USD = Number(convertCurrency({ rubleRate: usd }));
        const EUR = Number(convertCurrency({ rubleRate: eur }));
        const CNY = Number(convertCurrency({ rubleRate: cny }));
        return {
          month: date,
          eur: EUR,
          usd: USD,
          cny: CNY,
        };
      } catch (error) {
        console.error(`Ошибка при получении данных для даты ${date}:`, error);
        console.log(`Дата ${date} не была найдена.`);
      }
    });

    const data = await Promise.all(dataPromises);
    data.sort(
      (a, b) => new Date(a!.month).getTime() - new Date(b!.month).getTime()
    );
    setData(data.filter((item) => item !== undefined) as DataObject[]);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
};

export default getCurrency;
