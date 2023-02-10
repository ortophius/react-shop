import { Gate, useGate } from 'effector-react';
import { ComponentType } from 'react';

type Contract = <T>(component: ComponentType<T>, gate: Gate) => ComponentType<T>;

// export const contract = <P>(
//   component: ContractedComponent<P>,
//   gate: Gate<unknown>
// ) => {
//   useGate(gate);
//   return component;
// };

export function contract<T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>,
  gate: Gate<unknown>
) {
  const WrappedComponent = (props: T) => {
    useGate(gate);
    return <Component {...props} />;
  };

  return WrappedComponent;
}
