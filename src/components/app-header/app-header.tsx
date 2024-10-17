import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserName } from '@slices';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const name = useSelector(getUserName);
  return <AppHeaderUI userName={name} />;
};
