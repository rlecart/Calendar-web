import * as React from 'react';
import WithAuthentication from '../containers/WithAuthentication';

const NotFound = () => {
  return (
    <WithAuthentication>
      <div>
        404
      </div>
    </WithAuthentication>
  );
};

export default NotFound;