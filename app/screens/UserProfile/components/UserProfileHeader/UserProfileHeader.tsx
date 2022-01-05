import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-elements';
import { TUserProfile } from '../../UserProfile.types';
import {
  s,
  UserProfileHeaderContainer,
  UserProfileHeaderUserName,
  UserProfileHeaderRealName,
} from './UserProfileHeader.styles';
import { colors } from '../../../../config/colors';
import { common } from '../../../../common/common.styles';
import { constants } from '../../../../config/constants';

const UserProfileHeader: React.FC<TUserProfile> = ({ currentUser }) => {
  const showRealName = useCallback(() => {
    if (currentUser.firstName && currentUser.lastName) {
      return (
        <UserProfileHeaderRealName>{`${currentUser.firstName} ${currentUser.lastName}`}</UserProfileHeaderRealName>
      );
    }

    return null;
  }, [currentUser]);

  return (
    <UserProfileHeaderContainer>
      <Image
        source={{
          uri: currentUser?.img ? currentUser?.img : constants.userMock,
        }}
        style={s.img}
        PlaceholderContent={<ActivityIndicator color={colors.white} />}
        placeholderStyle={common.placeholder}
      />

      <View>
        <UserProfileHeaderUserName>{currentUser.userName}</UserProfileHeaderUserName>
        {showRealName()}
      </View>
    </UserProfileHeaderContainer>
  );
};

export default UserProfileHeader;
