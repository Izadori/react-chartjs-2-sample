import React from "react";
import ReactDOM from "react-dom";
import { Chart, Scatter } from "react-chartjs-2";
import Hammer from "hammerjs";
import zoomPlugin from "chartjs-plugin-zoom";
import { points } from "./make_peakdata.js";

Chart.register(zoomPlugin);

const initialData = {
  datasets: [
    {
      pointRadius: 0,
      borderWidth: 2,
      borderColor: "rbg(0, 0, 0)",
      showLine: true,
      cubicInterpolationMode: "monotone",
      data: points,
    },
  ],
};

// グラフタイトルの設定
const initialTitle = {
  text: "react-chartjs-2設定例",
  display: true,
  font: {
    size: 16,
  },
};

// 凡例の設定
const initialLegend = {
  display: true,
  position: "top",
  align: "center",
};

// x軸,y軸の設定
const initialScale = {
  x: {
    type: "linear",
    display: true,
    position: "bottom",
    title: {
      display: true,
      text: "x",
      font: {
        size: 14,
      },
    },
  },
  y: {
    type: "linear",
    display: true,
    title: {
      display: true,
      text: "y",
      font: {
        size: 14,
      },
    },
  },
};

// chartjs-plugin-zoomの設定
const initialZoomOptions = {
  pan: {
    enabled: true,
    mode: "xy",
    overScaleMode: "xy",
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    drag: {
      enabled: false,
    },
    mode: "xy",
    overScaleMode: "xy",
    onZoom: ({ chart }) => {
      const animation = chart.config.options.animation;
      // アニメーションを一時OFFにする
      chart.config.options.animation = false;
      // Y軸の最小値を0にする
      chart.config.options.scales.y.min = 0;
      // 画面を更新する
      chart.update();
      // アニメーションの設定を元に戻す
      chart.config.options.animation = animation;
    },
  },
  limits: {
    x: {
      min: 0,
    },
    y: {
      min: 0,
    },
  },
};

const initialState = {
  data: initialData,
  options: {
    scales: initialScale,
    plugins: {
      title: initialTitle,
      legends: initialLegend,
      zoom: initialZoomOptions,
    },
  },
};

const App = () => {
  return (
    <>
      <Scatter data={initialState.data} options={initialState.options} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
