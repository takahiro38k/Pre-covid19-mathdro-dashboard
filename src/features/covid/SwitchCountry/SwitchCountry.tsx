import React from 'react';
import { useDispatch } from 'react-redux';

// NativeSelect: mobileにも対応したselect form。
import { FormControl, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { fetchAsyncGetCountry } from '../covidSlice';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));

const SwitchCountry: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const countries = [
    "japan",
    "china",
    "us",
    "france",
    "italy",
    "spain",
    "united kingdom",
    "germany",
    "russia",
    "brazil",
    "taiwan",
    "thailand",
    "new zealand",
    "sweden",
    "india",
  ];

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        // para(e)の型はonChangeをhoverして確認。
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(fetchAsyncGetCountry(e.target.value))
        }
      >
        {/* NativeSelectの選択肢を作成。
          NativeSelectをhoverでdemoを確認可能。 */}
        <option value="">Worldwide</option>
        {countries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SwitchCountry;
