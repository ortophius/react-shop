import creditCardType from 'credit-card-type';
import visaLogo from './assets/visa.svg';
import mastercardLogo from './assets/mastercard.svg';
import amexLogo from './assets/amex.svg';
import unionLogo from './assets/union.svg';
import unknownLogo from './assets/unknown.svg';
import { FunctionComponent, SVGProps } from 'react';

const date = new Date();

const monthsArray = Array(12)
  .fill(true)
  .map((_, i) => i + 1);

export const monthsItems = monthsArray.map((month) => ({
  title: month.toString().length === 2 ? `${month}` : `0${month}`,
  value: month,
}));

export const currentYear = Number(date.getFullYear().toString().slice(-2));
export const currentMonth = date.getMonth() + 1;
export const yearsAray = Array(15)
  .fill(true)
  .map((_, i) => currentYear + i);

export const defaultCardInfo = {
  niceType: 'Visa',
  type: 'visa',
  patterns: [4],
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: 'CVV',
    size: 3,
  },
  matchStrength: 1,
};

export const numberRegex = /[^0-9]/g;
export const cardNumberPlaceholder = '#### #### #### ####';
export const cardHolderPlaceHolder = 'Ivan Ivanov';

export const formatCardNumber = (number: string) => {
  const cardInfo = creditCardType(number)[0] || defaultCardInfo;
  if (!Boolean(cardInfo)) return number;
  const { gaps } = cardInfo;
  const formattedNum: string[] = [];
  gaps.forEach((gapIndex, i) => {
    const prevGapIndex = gaps[i - 1] || 0;
    formattedNum.push(number.slice(prevGapIndex, gapIndex));
    if (gapIndex < number.length) formattedNum.push(' ');
    if (i === gaps.length - 1) formattedNum.push(number.slice(gapIndex));
  });

  return formattedNum.join('');
};

const vendorLogos: Record<string, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  visa: visaLogo,
  mastercard: mastercardLogo,
  'american-express': amexLogo,
  unionpay: unionLogo,
  unknown: unknownLogo,
};

export const getVendorLogo = (vendor: string) =>
  vendorLogos[vendor] || vendorLogos.unknown;
