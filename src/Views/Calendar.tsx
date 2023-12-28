import * as React from 'react';
import { Navigate } from 'react-router-dom';
import WithAuthentication from '../containers/WithAuthentication';

const Calendar = () => {
  return (
    <WithAuthentication>
      <div>
        Calendar
      </div>
    </WithAuthentication>
  );
};

export default Calendar;