import { OrderSteps } from '@/processes/order/model';
import { FinishScreen } from './ui/finish-screen/finish-screen';
import { AddressStep, PaymentStep, UserInfoStep } from './ui/steps';

export const orderScreens = {
  [OrderSteps.CUTOMER_INFO]: UserInfoStep,
  [OrderSteps.PAYMENT]: PaymentStep,
  [OrderSteps.ADDRESS]: AddressStep,
  [OrderSteps.FINAL_SCREEN]: FinishScreen,
};
