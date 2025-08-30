import React, { useMemo } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

export default ({ search }: any) => {
  const withDelay = (fn: Function, delay: number) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const SearchWithDetaly = useMemo(() => withDelay(search, 1000), [search]);

  return (
    <TextInput
      placeholder={'Search here...'}
      onChangeText={SearchWithDetaly}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: scale(50),
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: scale(12),
    padding: scale(10),
  },
});
