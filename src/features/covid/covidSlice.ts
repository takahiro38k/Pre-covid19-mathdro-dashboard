import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import dataJson from "./data.json";
import dataDailyJson from "./dataDaily.json";

const apiUrl = "https://covid19.mathdro.id/api";

type ApiData = typeof dataJson;
// Daily用のapi(https://covid19.mathdro.id/api/daily)は配列なので、
// 配列要素のobjectを一つだけdataDaily.jsonにcopyし、そこから型を取得。
type ApiDataDaily = typeof dataDailyJson;

// covidのslice全体のstateの型
type CovidState = {
  data: ApiData;
  country: string;
  dailyData: ApiDataDaily;
};
const initialState: CovidState = {
  data: {
    confirmed: {
      value: 19481330,
      detail: "https://covid19.mathdro.id/api/confirmed",
    },
    recovered: {
      value: 11801847,
      detail: "https://covid19.mathdro.id/api/recovered",
    },
    deaths: {
      value: 723599,
      detail: "https://covid19.mathdro.id/api/deaths",
    },
    dailySummary: "https://covid19.mathdro.id/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
      example: "https://covid19.mathdro.id/api/daily/2-14-2020",
    },
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: {
      pattern: "https://covid19.mathdro.id/api/countries/[country]",
      example: "https://covid19.mathdro.id/api/countries/USA",
    },
    lastUpdate: "2020-08-08T21:34:59.000Z",
  },
  country: "",
  dailyData: [
    {
      totalConfirmed: 555,
      mainlandChina: 548,
      otherLocations: 7,
      deltaConfirmed: 0,
      totalRecovered: 0,
      confirmed: {
        total: 555,
        china: 548,
        outsideChina: 7,
      },
      deltaConfirmedDetail: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      deaths: {
        total: 17,
        china: 17,
        outsideChina: 0,
      },
      recovered: {
        total: 0,
        china: 0,
        outsideChina: 0,
      },
      active: 0,
      deltaRecovered: 0,
      incidentRate: 0.44821646978651847,
      peopleTested: 0,
      reportDate: "2020-01-22",
    },
  ],
};

// ####data.jsonの非同期処理
// createAsyncThunk()
//   1st para: actionの任意の名前
//   2nd para: 非同期処理。
export const fetchAsyncGet = createAsyncThunk("covid/get", async () => {
  // axios.get()はpromiseオブジェクトを返す。dataプロパティのみを分割代入。
  const { data } = await axios.get<ApiData>(apiUrl);
  return data;
});

// ####dataDaily.jsonの非同期処理
export const fetchAsyncGetDaily = createAsyncThunk(
  "covid/getDaily",
  async () => {
    // axios.get()はpromiseオブジェクトを返す。dataプロパティのみを分割代入。
    const { data } = await axios.get<ApiDataDaily>(`${apiUrl}/daily`);
    return data;
  }
);

// ####data.jsonをもとにした国別データの非同期処理
export const fetchAsyncGetCountry = createAsyncThunk(
  "covid/getCountry",
  async (country: string) => {
    let dynamicUrl = apiUrl;
    if (country) {
      dynamicUrl = `${apiUrl}/countries/${country}`;
    }
    const { data } = await axios.get<ApiData>(dynamicUrl);
    return { data: data, country: country };
  }
);

// sliceの作成
const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {},
  // 上記3つの非同期処理(createAsyncThunk)に対する後続処理
  extraReducers: (builder) => {
    // fulfilled:  promiseの成功状態
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      // stateのdataプロパティのみをaction.payloadに置き換える。
      return {
        ...state,
        // action.payload: 非同期処理のreturn
        data: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        dailyData: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetCountry.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

// React Componentで参照するためにexport
export const selectData = (state: RootState) => state.covid.data;
export const selectDailyData = (state: RootState) => state.covid.dailyData;
export const selectCountry = (state: RootState) => state.covid.country;

// /app/store.tsに渡すためにexport
export default covidSlice.reducer;
