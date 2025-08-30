import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import UserListItem from './UserListItem';
import { scale } from 'react-native-size-matters';
import DetailsModal from '../DetailsModal';

interface Props {
  users: any[];
  isFetching: boolean;
}

export default ({ users, isFetching }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No data found</Text>
    </View>
  );

  const renderItemSeparator = () => <View style={styles.separator} />;

  return (
    <>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={
          isFetching
            ? Array.from({
                length: 10,
              })
            : users
        }
        renderItem={({ item }) => (
          <UserListItem
            isFetching={isFetching}
            item={item}
            onPress={() => {
              setSelected(item.name);
            }}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={renderItemSeparator}
      />
      <DetailsModal
        isVisible={selected != null}
        userName={selected}
        onBackDropPress={() => {
          setSelected(null);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: scale(10),
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: scale(16),
    color: '#666666',
  },
  separator: {
    height: scale(10),
  },
});
