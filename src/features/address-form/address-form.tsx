import { Button } from '@/shared/ui/components/button';
import { Input } from '@/shared/ui/components/input';
import { Map, Placemark, useYMaps } from '@pbe/react-yandex-maps';
import { useEvent, useStore } from 'effector-react';
import { useEffect, useRef, useState } from 'react';
import styles from './address-form.module.scss';
import {
  $address,
  $showHint,
  $suggestedAddress,
  $suggestedCoords,
  cityChanged,
  houseChanged,
  mapClicked,
  streetChanged,
} from './model';
import { AddressConfirm } from './ui/address-confirm';

type MapEvent = {
  get: (string: 'coords') => [number, number];
};

type AddressFormPayload = {
  city: string;
  street: string;
  house: string;
};

type AddressFormProps = {
  onSubmit: (e: AddressFormPayload) => void;
};

export const AddressForm = ({ onSubmit }: AddressFormProps) => {
  const clickHandler = useEvent(mapClicked);
  const address = useStore($address);
  const showHint = useStore($showHint);
  const coords = useStore($suggestedCoords);
  const mapRef = useRef<HTMLDivElement>(null);
  const { changeCity, changeStreet, changeHouse } = useEvent({
    changeCity: cityChanged,
    changeStreet: streetChanged,
    changeHouse: houseChanged,
  });
  const ymaps = useYMaps(['Map', 'Placemark']);
  const [mapInstance, setMapInstance] = useState<ymaps.Map | null>(null);
  const [mark, setMark] = useState<ymaps.Placemark | null>(null);

  const submitHandler = () =>
    onSubmit({
      city: address.locality,
      street: address.street,
      house: address.house,
    });

  useEffect(() => {
    if (!ymaps || !mapRef.current) return;

    if (!mapInstance) {
      const map = new ymaps.Map(mapRef.current, {
        center: [53.1955, 50.182956],
        zoom: 12,
      });
      map.events.add('click', (e: MapEvent) => {
        clickHandler(e.get('coords'));
      });
      map.cursors.push('arrow');
      setMapInstance(map);
      return;
    }

    if (coords) {
      const mark = new ymaps.Placemark(coords.reverse(), {});
      mapInstance.geoObjects.add(mark);
      setMark(mark);
      mapInstance?.setCenter(coords, 18, { duration: 200 });
    }

    return () => {
      if (mark) mapInstance.geoObjects.removeAll();
    };
  }, [ymaps, coords]);

  return (
    <div className={styles.map}>
      <div className={styles.title}>Адрес получения</div>
      <div className={styles.subtitle}>
        Вы можете указать адрес получения на карте
      </div>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          className={styles.city}
          value={address?.locality}
          onChange={({ currentTarget: { value } }) => changeCity(value)}
          placeholder="Город"
          required
        />
        <Input
          className={styles.street}
          value={address?.street}
          onChange={({ currentTarget: { value } }) => changeStreet(value)}
          placeholder="Улица"
          required
        />
        <Input
          value={address?.house}
          className={styles.house}
          onChange={({ currentTarget: { value } }) => changeHouse(value)}
          placeholder="Дом"
          required
        />
        <Button className={styles.submit} type="submit">
          Оформить
        </Button>
      </form>
      <div className={styles.ymap} ref={mapRef} />
      {showHint && <AddressConfirm />}
    </div>
  );
};
