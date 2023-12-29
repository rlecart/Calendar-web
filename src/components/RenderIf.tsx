import * as React from 'react';

interface RenderIfProps {
  isTrue: boolean;
  children: JSX.Element | JSX.Element[];
}

type RenderIfType = JSX.Element | null;

const RenderIf = ({ isTrue, children }: RenderIfProps): RenderIfType => {
  return isTrue ? <React.Fragment>{children}</React.Fragment> : null;
};

export default RenderIf;