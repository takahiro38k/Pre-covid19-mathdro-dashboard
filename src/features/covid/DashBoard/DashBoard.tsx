import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Container, Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Cards from '../Cards/Cards';
import Chart from '../Chart/Chart';
import { fetchAsyncGet, fetchAsyncGetDaily, selectData } from '../covidSlice';
import PieChart from '../PieChart/PieChart';
import SwithCountry from '../SwitchCountry/SwitchCountry';
import styles from './DashBoard.module.css';

const useStyles = makeStyles((theme) => ({
  title: {
    // 幅の比率
    // 要素が1つの時にflexGrow: 1を設定すると、幅が100%として表示される。
    flexGrow: 1,
  },
  content: {
    marginTop: 85,
  },
}));

const DashBoard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  // 起動時にapiの値を取得。
  useEffect(() => {
    dispatch(fetchAsyncGet());
    dispatch(fetchAsyncGetDaily());
  }, [dispatch]);

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid 19 Live Dashboard
          </Typography>
          {data && (
            <Typography variant="body1">
              {/* toDateString()
                人が読みやすい日付表記に変更。 */}
              {new Date(data.lastUpdate).toDateString()}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwithCountry />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Chart />
          </Grid>

          <Grid item xs={12} md={5}>
            <PieChart />
          </Grid>

          <Grid item xs={12} md={12}>
            <Cards />
          </Grid>
        </Grid>
      </Container>
      <p>************************************************************</p>
      <p>Test</p>
    </div>
  );
};

export default DashBoard;
