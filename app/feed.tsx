// feed.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  Image,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Post from './components/Post';
import { getFeedPosts, createNewPost } from '@/services/AlumService';
import { PostProps } from './components/Post';
import { useAuth } from '../context/AuthContext';

const FeedScreen = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const SkeletonCard = () => (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonHeader}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonText} />
      </View>
      <View style={styles.skeletonContent} />
    </View>
  );

  const fetchPosts = useCallback(async () => {
    try {
      const response = await getFeedPosts();
      if (Array.isArray(response.data)) {
        // Sort posts by latest first (assuming posts have timestamp or createdAt)
        const sortedPosts = response.data.sort((a, b) => 
          new Date(b.createdAt || b.timestamp || 0).getTime() - 
          new Date(a.createdAt || a.timestamp || 0).getTime()
        );
        setPosts(sortedPosts);
      } else {
        throw new Error('Invalid posts data format');
      }
      setError('');
    } catch (err) {
      setError('Failed to load posts. Please try again.');
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostSubmit = async () => {
    if (!newPost.trim()) {
      Alert.alert('Error', 'Post content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    Keyboard.dismiss();

    try {
      const postData = {
        authorId: user?.id || 'anonymous',
        authorName: user?.fullName || 'Anonymous User',
        content: newPost,
      };

      const response = await createNewPost(postData);
      setPosts([response.data, ...posts]);
      setNewPost('');

      Alert.alert('Success', 'Your post has been shared!');
    } catch (err) {
      Alert.alert('Error', 'Failed to create post');
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.modernPostCard}>
          <View style={styles.userRow}>
            <View style={styles.skeletonAvatar} />
            <View style={styles.skeletonText} />
          </View>
        </View>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="cloud-offline-outline" size={64} color={Colors.gray400} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Modern Post Input Card */}
      <View style={styles.modernPostCard}>
        <View style={styles.userRow}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.userAvatar} 
          />
          <View style={styles.postInputContainer}>
            <TextInput
              style={styles.postInput}
              placeholder="What's on your mind?"
              placeholderTextColor="#9AA0A6"
              value={newPost}
              onChangeText={setNewPost}
              multiline
              editable={!isSubmitting}
            />
            {newPost.trim() && (
              <TouchableOpacity
                style={[styles.postButton, isSubmitting && styles.disabledButton]}
                onPress={handlePostSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={Colors.white} size="small" />
                ) : (
                  <Text style={styles.postButtonText}>Post</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="image-outline" size={20} color="#4CAF50" />
            <Text style={styles.actionText}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="videocam-outline" size={20} color="#FF5722" />
            <Text style={styles.actionText}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bar-chart-outline" size={20} color="#2196F3" />
            <Text style={styles.actionText}>Poll</Text>
          </TouchableOpacity>
        </View>
      </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => <Post post={item} />} // Assuming Post component is updated to accept 'post' prop
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No posts yet. Be the first to post!</Text>
            </View>
          }
          contentContainerStyle={[
            styles.listContent,
            posts.length === 0 && styles.emptyListContainer
          ]}
        />

        {/* Decorative shapes */}
        <View style={[styles.shape, styles.shapeBlue]} />
        <View style={[styles.shape, styles.shapeRed]} />
        <View style={[styles.shape, styles.shapeYellow]} />
        <View style={[styles.shape, styles.shapeGreen]} />
      </Animated.View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
  },
  modernPostCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postInputContainer: {
    flex: 1,
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 60,
    justifyContent: 'center',
  },
  postInput: {
    fontSize: 17,
    color: Colors.black,
    marginBottom: 8,
    minHeight: 24,
  },
  postButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignSelf: 'flex-end',
  },
  disabledButton: {
    backgroundColor: Colors.gray300,
  },
  postButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    marginLeft: 6,
    color: Colors.gray500,
    fontSize: 14,
    fontWeight: '500',
  },
  skeletonCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray200,
    marginRight: 12,
  },
  skeletonText: {
    flex: 1,
    height: 16,
    backgroundColor: Colors.gray200,
    borderRadius: 8,
  },
  skeletonContent: {
    height: 80,
    backgroundColor: Colors.gray200,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.error,
    marginBottom: 10,
    fontSize: 16,
  },
  retryButton: {
    padding: 10,
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
  },
  retryText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListContainer: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.gray500,
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  shape: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: -1,
  },
  shapeBlue: {
    backgroundColor: 'rgba(43, 108, 176, 0.1)',
    top: '15%',
    left: -40,
  },
  shapeRed: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    top: '40%',
    right: -40,
    width: 60,
    height: 60,
  },
  shapeYellow: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    bottom: '20%',
    left: -30,
    width: 100,
    height: 100,
  },
  shapeGreen: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    bottom: '10%',
    right: -20,
    width: 70,
    height: 70,
  },
});

export default FeedScreen;