export interface IChildrenProps {
  children: JSX.Element;
}

export type LocationProps = {
  state: {
    from: Location;
  };
};

declare module 'googlemaps';
