import React, { FunctionComponent } from 'react';
import { CartWireInterface } from './model';
import './styles.scss';
import { CartWireButton } from '../Common/Button';

const CartWire: FunctionComponent<CartWireInterface> = ({
  smartProductId,
  src = 'https://s3.cartwire.co/widget/js/widget_master_v2.js',
  id = 'cartwire-script',
  modifier = 'default',
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const loadAddtoBasket = () => {
    if (isLoaded || isLoading) {
      return;
    }
    setIsLoading(true);
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.setAttribute('async', 'true');
    document.head.append(script);
    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };
  };
  const handleClick = () => {
    if(typeof window !== 'undefined'){
      if(!isLoaded){
        loadAddtoBasket();
        const widgetTimer =  setInterval(() => {
          if(window.loadsWidget){
            window.loadsWidget(smartProductId, this, 'retailPopup', 'ph');
            clearInterval(widgetTimer);
          }
        }, 200);
      }else{
        window.loadsWidget(smartProductId, this, 'retailPopup', 'ph');
      }
    }
  };
  return (
    <div
      className="add-to-basket"
      onFocus={loadAddtoBasket}
      onMouseOver={loadAddtoBasket}
    >
      <CartWireButton
        onClick={handleClick}
        {...rest}
        label="Buy Now"
        modifier={modifier}
      />
    </div>
  );
};

export default CartWire;
