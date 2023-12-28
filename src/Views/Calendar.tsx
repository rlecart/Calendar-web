import * as React from 'react';
import WithAuthentication from '../containers/WithAuthentication';
import Header from '../components/Header';

const Calendar = () => {
  return (
    <WithAuthentication>
      <Header />
    </WithAuthentication>
  );
};

export default Calendar;