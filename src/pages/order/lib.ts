import { OrderSteps } from '@/processes/order';
import { orderScreens } from './model';

export const renderOrderStep = (step: OrderSteps) => {
  return orderScreens[step]();
};
