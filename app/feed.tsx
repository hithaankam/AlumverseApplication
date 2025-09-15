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
  SafeAreaView // Added SafeAreaView
} from 'react-native';
import Colors from '../constants/Colors';
import Post from './components/Post';
import { getFeedPosts, createNewPost } from '@/services/AlumService';
import { PostProps } from './components/Post';

const FeedScreen = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await getFeedPosts();
      if (Array.isArray(response.data)) {
        setPosts(response.data);
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
        authorId: '686f98af573d2c5ecd29608c', // This should come from auth context
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
      <SafeAreaView style={styles.centered}> {/* Wrap in SafeAreaView */}
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}> {/* Wrap in SafeAreaView */}
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchPosts}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}> {/* Main SafeAreaView */}
      <View style={styles.container}>
        <View style={styles.postInputContainer}>
          <TextInput
            style={styles.postInput}
            placeholder="Share something with your network..."
            placeholderTextColor={Colors.gray400} // Use new gray shade
            value={newPost}
            onChangeText={setNewPost}
            multiline
            editable={!isSubmitting}
          />
          <TouchableOpacity
            style={[
              styles.postButton,
              (!newPost.trim() || isSubmitting) && styles.disabledButton
            ]}
            onPress={handlePostSubmit}
            disabled={!newPost.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.postButtonText}>Post</Text>
            )}
          </TouchableOpacity>
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
          contentContainerStyle={posts.length === 0 && styles.emptyListContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.gray50, // Light background for the entire screen
  },
  container: {
    flex: 1,
    backgroundColor: Colors.gray50, // Light background for the feed area
    padding: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray50, // Consistent background
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.gray500, // Darker gray for loading text
  },
  postInputContainer: {
    marginBottom: 15,
  },
  postInput: {
    borderWidth: 1,
    borderColor: Colors.gray200, // Softer border color
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    marginBottom: 10,
    backgroundColor: Colors.white,
    fontSize: 16,
    color: Colors.gray600, // Input text color
  },
  postButton: {
    backgroundColor: Colors.primary, // Use primary color for post button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  disabledButton: {
    backgroundColor: Colors.gray200, // Lighter gray for disabled button
  },
  postButtonText: {
    color: Colors.white, // White text for post button
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: Colors.error, // Use new error color
    marginBottom: 10,
    fontSize: 16,
  },
  retryButton: {
    padding: 10,
    backgroundColor: Colors.primaryLight, // Use primaryLight for retry button
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.primary, // Use primary for retry text
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
    color: Colors.gray500, // Darker gray for empty text
    fontSize: 16,
  },
});

export default FeedScreen;