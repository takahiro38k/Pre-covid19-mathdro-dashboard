import React from 'react';
import CountUp from 'react-countup';
import { AiFillLike } from 'react-icons/ai';
import { GiHastyGrave } from 'react-icons/gi';
import { MdLocalHospital } from 'react-icons/md';
// reduxからstoreのstateを取得するために必要。
// 引数にstateを返す関数(今回の場合selectData)を指定して仕様する。
import { useSelector } from 'react-redux';

import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import { selectData } from '../covidSlice';
import styles from './Cards.module.css';

const Cards: React.FC = () => {
  const data = useSelector(selectData);
  return (
    <div className={styles.container}>
      <Grid container spacing={1} justify="center">
        {/* component属性でGridのコンポーネントのタイプを指定できる。 */}
        <Grid item xs={12} md={3} component={Card} className={styles.infected}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <MdLocalHospital />
              Infected persons
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                // confirmed.value: 感染者数
                end={data.confirmed.value}
                // start表示からend表示に変わるまでの時間指定(秒)
                duration={1.5}
                // 3桁ごとに","を挿入
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={styles.recovered}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <AiFillLike /> Recovered persons
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                // recovered.value: 回復者数
                end={data.recovered.value}
                duration={1.5}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} md={3} component={Card} className={styles.deaths}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <GiHastyGrave />
              Dead persons
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                // deaths.value: 死者数
                end={data.deaths.value}
                duration={1.5}
                separator=","
              />
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
