export type Coords = [number, number];
export type Kind =
  | 'country'
  | 'province'
  | 'area'
  | 'locality'
  | 'street'
  | 'house';
export type GeocodeResponse = {
  response: {
    GeoObjectCollection: {
      featureMember: {
        GeoObject: {
          metaDataProperty: {
            GeocoderMetaData: {
              precision: string;
              text: string;
              kind: string;
              Address: {
                formatted: string;
                Components: {
                  kind: Kind;
                  name: string;
                }[];
              };
            };
            name: string;
          };
          Point: { pos: string };
        };
      }[];
    };
  };
};

export type Address = {
  [key in Kind]: string;
};

export const API_KEY = '7fb9e154-4965-463a-b378-a0c3261bbb6b';
export const getReverseGeocodePath = (coords: Coords) =>
  `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${API_KEY}&kind=house&geocode=${coords[1]},${coords[0]}&results=1`;
export const getGeocodePath = (address: Address) =>
  `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${API_KEY}&kind=house&geocode=${address.locality},+${address.street},+${address.house}&results=1`;

export const mapApiResponseToAddress = (res: GeocodeResponse) => {
  const address =
    res.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty
      .GeocoderMetaData.Address;
  const result: Address = {
    country: '',
    province: '',
    area: '',
    locality: '',
    street: '',
    house: '',
  };

  address.Components.forEach(({ kind, name }) => {
    if (kind in result) result[kind] = name;
  });

  return result;
};
