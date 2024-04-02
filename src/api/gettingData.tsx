import axios from "axios";
import { convertRubleTo } from "../utils";

const gettingData = async (interimDates, setRequest, setData) => {
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

export default gettingData;
