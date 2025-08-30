import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import SearchInput from '../componenets/SearchInput';
import UserList from '../componenets/UserList';
import service from '../service';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
  const [isFetching, setIsFetching] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const search = (query: string) => {
    if (!query) {
      setUsers(allUsers);
    } else {
      setUsers(
        allUsers.filter(item =>
          item?.name?.includes(query.toLocaleLowerCase()),
        ),
      );
    }
  };

  const setData = (data: any) => {
    setAllUsers(data);
    setUsers(data);
  };
  useEffect(() => {
    service.getUsers(setData, setIsFetching);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput search={search} />
      <UserList isFetching={isFetching} users={users} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(12),
    paddingTop: scale(12),
    flex: 1,
  },
});
