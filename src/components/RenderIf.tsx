import * as React from 'react';

interface IRenderIfProps {
  isTrue: boolean;
  children: JSX.Element | JSX.Element[] | string;
}

type RenderIfType = JSX.Element | null;

const RenderIf = ({ isTrue, children }: IRenderIfProps): RenderIfType => {
  return isTrue ? <React.Fragment>{children}</React.Fragment> : null;
};

export default RenderIf;