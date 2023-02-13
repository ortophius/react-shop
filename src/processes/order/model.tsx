import { createEvent, createStore, sample } from 'effector';

export enum OrderSteps {
  CUTOMER_INFO,
  PAYMENT,
  ADDRESS,
  FINAL_SCREEN,
}

export const orderFlow = [
  OrderSteps.CUTOMER_INFO,
  OrderSteps.PAYMENT,
  OrderSteps.ADDRESS,
  OrderSteps.FINAL_SCREEN,
];

export const orderStepCompleted = createEvent();
export const $currentStepIndex = createStore<number>(0);
export const $currentStep = createStore<OrderSteps>(orderFlow[0]);

sample({
  source: $currentStepIndex,
  fn: (index) => orderFlow[index],
  target: $currentStep,
});

sample({
  clock: orderStepCompleted,
  source: $currentStepIndex,
  filter: (currentIndex) => currentIndex <= orderFlow.length - 1,
  fn: (currentIndex) => currentIndex + 1,
  target: $currentStepIndex,
});
