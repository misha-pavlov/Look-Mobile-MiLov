import React, { useCallback, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { Divider, TabsBlock, TabsContainer } from './CustomProfileTabs.styles';
import { UserProfileTabs } from './config/constants';
import { toValue } from './helpers/helpers';
import Tab from './components/Tab/Tab';
import { TCustomProfileTabsTypes } from './CustomProfileTabs.types';
import Spinner from '../../../../components/Spinner/Spinner';
import UserPosts from './components/UserPosts/UserPosts';
import { isImageUrl } from '../../../../helpers/isImageUrl';
import { Posts } from '../../../../types/graphql';

const CustomProfileTabs: React.FC<TCustomProfileTabsTypes> = ({ currentUser, posts, loading }) => {
  const [activeTab, setActiveTab] = useState(UserProfileTabs.POSTS);
  const slideInLeft = useRef(new Animated.Value(0)).current;

  const isPostsTab = activeTab === UserProfileTabs.POSTS;
  const isFollowersTab = activeTab === UserProfileTabs.FOLLOWERS;
  const isFollowingTab = activeTab === UserProfileTabs.FOLLOWING;

  const _start = (tabName: string) => {
    return Animated.parallel([
      Animated.timing(slideInLeft, {
        toValue: toValue(tabName),
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressTab = (tabName: string) => {
    setActiveTab(tabName);
    _start(tabName);
  };

  const realPosts = posts?.filter(p => isImageUrl(p.img)) as [Posts];

  const renderTabsContent = useCallback(() => {
    if (isPostsTab) {
      return <UserPosts posts={realPosts} loading={loading} />;
    }

    return null;
  }, [realPosts, isPostsTab]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View>
      <TabsBlock>
        <TabsContainer>
          <Tab
            name={UserProfileTabs.POSTS}
            count={realPosts.length.toString()}
            isActive={isPostsTab}
            onPress={() => onPressTab(UserProfileTabs.POSTS)}
          />
          <Tab
            name={UserProfileTabs.FOLLOWERS}
            count={currentUser.followers.length.toString()}
            isActive={isFollowersTab}
            onPress={() => onPressTab(UserProfileTabs.FOLLOWERS)}
          />
          <Tab
            name={UserProfileTabs.FOLLOWING}
            count={currentUser.following.length.toString()}
            isActive={isFollowingTab}
            onPress={() => onPressTab(UserProfileTabs.FOLLOWING)}
          />
        </TabsContainer>
        <Divider
          style={{
            transform: [
              {
                translateX: slideInLeft,
              },
            ],
          }}
        />

        {renderTabsContent()}
      </TabsBlock>
    </View>
  );
};

export default CustomProfileTabs;