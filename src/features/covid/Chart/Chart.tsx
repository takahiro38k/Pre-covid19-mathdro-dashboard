import React from "react";
import { Bar, Line } from "react-chartjs-2";
// reduxからstoreのstateを取得するために必要。
// 引数にstateを返す関数(今回の場合selectData 他2つ)を指定して仕様する。
import { useSelector } from "react-redux";

import { selectCountry, selectDailyData, selectData } from "../covidSlice";
import styles from "./Chart.module.css";

const Chart: React.FC = () => {
  const data = useSelector(selectData);
  const dailyData = useSelector(selectDailyData);
  const country = useSelector(selectCountry);

  // 国別chart
  // data === true の場合のみ(データが存在する場合のみ)<Bar>を作成。
  const barChart = data && (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "#008080",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        // 凡例を非表示
        legend: { display: false },
        title: { display: true, text: `Latest status in ${country}` },
      }}
    />
  );

  // 全世界の時系列chart
  // dailyData[0] === true の場合のみ(データが存在する場合のみ)<Line>を作成。
  const lineChart = dailyData[0] && (
    <Line
      data={{
        // dailyDataの各要素において、reportDateを分割代入し、戻り値として返す。
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed.total),
            label: "Infected",
            borderColor: "#3333ff",
            // x軸の領域を塗りつぶす。
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths.total),
            label: "Deaths",
            borderColor: "#ff3370",
            fill: true,
          },
        ],
      }}
    />
  );

  return (
    <div className={styles.container}>
      {/* 三項演算子で表示するchartを選択。
        国名が選択されていない場合は、全世界のlineChartを表示。 */}
      {country.length ? barChart : lineChart}
    </div>
  );
};

export default Chart;
