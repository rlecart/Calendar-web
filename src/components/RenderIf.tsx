interface RenderIfProps {
  isTrue: boolean;
  children: JSX.Element;
}

type RenderIfType = JSX.Element | null;

const RenderIf = ({ isTrue, children }: RenderIfProps): RenderIfType => {
  return isTrue ? children : null;
};

export default RenderIf;