import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TUserPosts } from './UserPosts.types';
import { UserPostsBlock } from './UserPosts.styles';
import Spinner from '../../../../../../components/Spinner/Spinner';
import Card from '../../../../../../components/Card/Card';
import { screens } from '../../../../../../config/screens';
import { NAppNavigatorNavigationProp } from '../../../../../../navigation/types/AppNavigator.types';

const UserPosts: React.FC<TUserPosts> = ({ posts, loading }) => {
  const navigations = useNavigation<NAppNavigatorNavigationProp<'UserPostsList'>>();

  const getPosts = posts?.map((p, index) => {
    return (
      <Card key={p._id} post={p} onPress={() => navigations.navigate(screens.UserPostsList, { indexItem: index })} />
    );
  });

  if (loading) {
    return <Spinner />;
  }

  return <UserPostsBlock>{getPosts}</UserPostsBlock>;
};

export default UserPosts;