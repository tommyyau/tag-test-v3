export interface CartWireInterface {
  smartProductId: string;
  label: {
    type: string;
  };
  src: string;
  id: string;
  rest: any;
  modifier?: string;
}
