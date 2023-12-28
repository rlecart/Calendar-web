import * as React from 'react';
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