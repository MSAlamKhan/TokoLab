import React, { useEffect, useState } from 'react';
import { Text, Image, Dimensions, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import service from '../../service';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Props {
  userName: string | null;
  isVisible: boolean;
  onBackDropPress: () => any;
}

interface UserDetails {
  name?: string;
  email?: string;
  location?: string;
  followers?: number;
  following?: number;
  avatar_url?: string;
}

export default ({ userName, isVisible, onBackDropPress }: Props) => {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    if (userName) {
      setIsFetching(true);
      service.getUserByName(userName, setDetails, setIsFetching);
    }
  }, [userName]);

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={styles.skeletionContent}>
        <View style={styles.avatarContainer} />
        <View style={styles.detailsContainer}>
          <View style={styles.skeletonName} />
          <View style={styles.skeletonEmail} />
          <View style={styles.skeletonLocation} />
          <View style={styles.skeletonFollowers} />
          <View style={styles.skeletonFollowing} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
  return (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent
      deviceHeight={Dimensions.get('screen').height}
      onBackdropPress={onBackDropPress}
      style={styles.modalContainer}
    >
      {isFetching ? (
        renderSkeleton()
      ) : (
        <View style={styles.modalContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: details?.avatar_url }}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>{details?.name}</Text>
            {details?.email != null && (
              <Text style={styles.emailText}>{details?.email}</Text>
            )}
            {details?.location != null && (
              <Text style={styles.locationText}>{details?.location}</Text>
            )}
            {details?.followers != null && (
              <Text style={styles.followersText}>
                Followers: {details?.followers}
              </Text>
            )}
            {details?.following != null && (
              <Text style={styles.followingText}>
                Following: {details?.following}
              </Text>
            )}
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    height: scale(250),
    width: scale(250),

    backgroundColor: 'white',
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: scale(15),
  },
  skeletionContent: {
    height: scale(250),
    width: scale(250),
    borderWidth: 1,
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  avatarContainer: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(100),
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  detailsContainer: {
    alignItems: 'center',
  },
  nameText: {
    textAlign: 'center',
    fontSize: scale(15),
    fontWeight: '600',
    color: '#333333',
  },
  emailText: {
    textAlign: 'center',
    fontSize: scale(15),
    fontWeight: '600',
    color: '#333333',
  },
  locationText: {
    textAlign: 'center',
    fontSize: scale(15),
    fontWeight: '500',
    color: '#666666',
  },
  followersText: {
    textAlign: 'center',
    fontSize: scale(15),
    fontWeight: '400',
    color: '#666666',
  },
  followingText: {
    textAlign: 'center',
    fontSize: scale(15),
    fontWeight: '400',
    color: '#666666',
  },
  skeletonName: {
    width: scale(120),
    height: scale(16),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  skeletonEmail: {
    width: scale(100),
    height: scale(14),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  skeletonLocation: {
    width: scale(80),
    height: scale(14),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  skeletonFollowers: {
    width: scale(90),
    height: scale(14),
    borderRadius: scale(4),
    marginBottom: scale(8),
  },
  skeletonFollowing: {
    width: scale(85),
    height: scale(14),
    borderRadius: scale(4),
  },
});
