import React from 'react';
import './styles.scss';
import { IconBuy } from '../../../Icons/globalIcons';

export const PrimaryButton = (props: ButtonProps) => {
  const { lable, link, ...rest } = props;
  return (
    <a target="_blank" rel="noreferrer" href={link} {...rest}>
      <button className="bp-primary-button">
        <IconBuy /> {lable}
      </button>
    </a>
  );
};

export const SecondaryButton = (props: ButtonProps) => {
  const { lable, link, ...rest } = props;
  return (
    <a target="_blank" className="bp-secondary-button" aria-label={`${lable} - New Window`} rel="noreferrer" href={link} {...rest}>
      {lable}
    </a>
  );
};

export const CartWireButton = (props: CartWireProps) => {
  const { id, label, onClick, modifier, ...rest } = props;
  return (
    <button id={id} className={`bp-primary-button bp-primary-button-${modifier} cartwire`} {...rest} onClick={onClick}>
      <span>
        <IconBuy />
        <span>
          {label}
        </span>
      </span>
    </button>
  );
};

interface ButtonProps {
  lable: string;
  link: string;
}

interface CartWireProps {
  id: string;
  label: string;
  onClick: any;
  rest: any;
  modifier?: string;
}
