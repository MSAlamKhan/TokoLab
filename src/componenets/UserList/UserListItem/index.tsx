import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface UserListItemProps {
  isFetching?: boolean;
  item: {
    name?: string;
    gitLink?: string;
    avatarUrl?: string;
  };
  onPress?: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  isFetching = false,
  item,
  onPress,
}) => {
  if (isFetching) {
    return (
      <SkeletonPlaceholder>
        <View style={styles.container}>
          <View style={styles.avatarContainer} />
          <View style={styles.contentContainer}>
            <View style={styles.skeletonName} />
            <View style={styles.skeletonGitLink} />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          resizeMode="contain"
          source={{ uri: item.avatarUrl }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.gitLinkText} numberOfLines={1} ellipsizeMode="tail">
          {item.gitLink}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(70),
    padding: scale(10),
    alignItems: 'center',
    gap: scale(10),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  avatarContainer: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(100),
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333333',
  },
  gitLinkText: {
    fontSize: scale(14),
    color: '#666666',
    width: '95%',
  },
  skeletonPlaceholder: {
    backgroundColor: '#E0E0E0',
  },
  skeletonName: {
    width: scale(120),
    height: scale(16),
    borderRadius: scale(4),
    marginBottom: scale(10),
  },
  skeletonGitLink: {
    width: scale(80),
    height: scale(16),
    borderRadius: scale(4),
  },
});

export default UserListItem;
