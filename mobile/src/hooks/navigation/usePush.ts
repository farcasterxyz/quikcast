import { StackActions, useNavigation } from '@react-navigation/core';
import { useCallback } from 'react';

import { RootParamList, ScreenName } from '../../types/navigation';

const usePush = () => {
  const { dispatch } = useNavigation();

  return useCallback(
    <Name extends ScreenName>(name: Name, params: RootParamList[Name]) => {
      return dispatch(StackActions.push(name, params));
    },
    [dispatch],
  );
};

export { usePush };
