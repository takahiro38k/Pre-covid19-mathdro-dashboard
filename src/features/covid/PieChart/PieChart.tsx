import React from "react";
import { Doughnut } from "react-chartjs-2";
// reduxからstoreのstateを取得するために必要。
// 引数にstateを返す関数(今回の場合selectData)を指定して仕様する。
import { useSelector } from "react-redux";

import { Typography } from "@material-ui/core";

import { selectData } from "../covidSlice";

const PieChart: React.FC = () => {
  const data = useSelector(selectData);
  // data.confirmedの値がtrueの場合のみ、死亡率を算出。
  const mortality =
    data.confirmed && (100 * data.deaths.value) / data.confirmed.value;

  // dataの値がtrueの場合のみ、<Doughnut>を作成。
  const pieChart = data && (
    <Doughnut
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "#008080",
              "rgba(255, 0, 0, 0.5)",
            ],
            hoverBackgroundColor: ["#36A2EB", "#3cb371", "#FF6384"],
            borderColor: ["transparent", "transparent", "transparent"],
          },
        ],
      }}
      options={{
        // legendを指定して凡例を表示
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 15,
          },
        },
      }}
    />
  );

  return (
    <>
      {data.confirmed && (
        <Typography align="center" color="textSecondary" gutterBottom>
          {/* Number.prototype.toFixed()
            小数点以下の桁数を指定。argなしの場合は0。 */}
          Mortality {data.confirmed && mortality.toFixed(2)} [%]
        </Typography>
      )}
      {pieChart}
    </>
  );
};

export default PieChart;
