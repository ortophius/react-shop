import { createEffect, createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum';
import {
  Address,
  Coords,
  GeocodeResponse,
  getGeocodePath,
  getReverseGeocodePath,
  mapApiResponseToAddress,
} from './lib';

const getAddressFx = createEffect(async (longlat: Coords) => {
  const res = (await (
    await fetch(getReverseGeocodePath(longlat))
  ).json()) as GeocodeResponse;
  return mapApiResponseToAddress(res);
});

const getCoordsFx = createEffect(async (addr: Address) => {
  const res = (await (
    await fetch(getGeocodePath(addr))
  ).json()) as GeocodeResponse;
  const featureMember = res.response.GeoObjectCollection.featureMember;
  if (!featureMember.length) throw new Error();
  const coords = featureMember[0].GeoObject.Point.pos.split(' ').map(Number);
  return [coords[0], coords[1]] as Coords;
});

export const addressChanged = createEvent<Address>();
export const mapClicked = createEvent<Coords>();
export const suggestionAccepted = createEvent();
export const suggestionClosed = createEvent();
export const cityChanged = createEvent<string>();
export const streetChanged = createEvent<string>();
export const houseChanged = createEvent<string>();

export const $showHint = createStore(false);
export const $address = createStore<Address>({
  area: '',
  country: '',
  house: '',
  locality: '',
  province: '',
  street: '',
});
export const $suggestedAddress = createStore<Address | null>(null).reset([
  suggestionClosed,
]);
export const $suggestedCoords = createStore<Coords | null>(null);

sample({
  source: mapClicked,
  target: getAddressFx,
});

sample({
  source: getAddressFx.doneData,
  target: $suggestedAddress,
});

sample({
  clock: suggestionAccepted,
  source: $suggestedAddress,
  filter: Boolean,
  target: $address,
});

sample({
  source: $suggestedAddress,
  fn: Boolean,
  target: $showHint,
});

sample({
  clock: cityChanged,
  source: $address,
  fn: (address, city) => ({ ...address, locality: city }),
  target: $address,
});

sample({
  clock: streetChanged,
  source: $address,
  fn: (address, street) => ({ ...address, street }),
  target: $address,
});

sample({
  clock: houseChanged,
  source: $address,
  fn: (address, house) => ({ ...address, house }),
  target: $address,
});

sample({
  source: $address,
  filter: (addr) =>
    Boolean(addr.locality) && Boolean(addr.street) && Boolean(addr.house),
  target: addressChanged,
});

const addressChangedDebounced = debounce({
  source: addressChanged,
  timeout: 1000,
});

sample({
  clock: addressChangedDebounced,
  target: getCoordsFx,
});

sample({
  source: getCoordsFx.doneData,
  target: $suggestedCoords,
});
