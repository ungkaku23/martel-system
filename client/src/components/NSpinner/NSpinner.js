import React from 'react';
import { Spinner } from 'reactstrap';

import s from './NSpinner.module.scss';

const NSpinner = (props) => {
  return (
    <div className={s.nspinnerContainer} >
      <Spinner></Spinner>
    </div>
  )
}

export default NSpinner;
