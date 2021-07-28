import "./styles.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
  XAxis,
  Legend,
  Tooltip,
  BarChart,
  Bar
} from "recharts";
import { useEffect, useState } from "react";
import * as candlesData from "./data.json";

function Chart({ data }) {
  return (
    <>
      <h4>Title</h4>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart width={400} height={400} data={data.c}>
          <CartesianGrid strokeDasharray="1" />
          <Tooltip />
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            domain={[Math.min(...data.c), "auto"]}
            allowDataOverflow={true}
          />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function Candle() {
  return (
    <g class="recharts-layer recharts-bar-rectangle">
      <path
        type="monotone"
        stroke="#8884d8"
        width="5"
        height="101.99999999999926"
        x="369.52333333333337"
        y="163.00000000000074"
        radius="0"
        class="recharts-rectangle"
        d="M 369.52333333333337,163.00000000000074 h 5 v 101.99999999999926 h -5 Z"
      ></path>
    </g>
  );
}

function CandlestickChart({ data }) {
  return (
    <>
      <h4>Title</h4>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart width={400} height={400} data={data.c}>
          <CartesianGrid strokeDasharray="1" />
          <Tooltip />
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            domain={[Math.min(...data.c), "auto"]}
            allowDataOverflow={true}
          />
          <Bar type="monotone" dataKey="price" stroke="#8884d8" />
          {/* <Candle /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
export default function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(candlesData);

    const closePrices = candlesData["c"].map((d) => {
      console.log(d);
      return {
        price: d
      };
    });
    candlesData.c = closePrices;
    setData(candlesData);
  }, []);
  console.log(data);
  if (data === null || data === undefined) return <p>Loading..</p>;
  return (
    <>
      <Chart data={data} />
      <CandlestickChart data={data} />
    </>
  );
}

// useEffect(() => {
//   fetch(
//     "https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=D&from=1572651390&to=1575243390&token=c40r1v2ad3idvnta2dtg"
//   )
//     .then((response) => response.json())
//     .then((d) => setData(d));
// }, []);
