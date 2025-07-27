// feed.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  Keyboard 
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

  const fetchPosts = async () => {
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
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (!newPost.trim()) {
      Alert.alert('Error', 'Post content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    Keyboard.dismiss();

    try {
      const postData = {
        authorId: '686f98af573d2c5ecd29608c',
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

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchPosts}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.postInputContainer}>
        <TextInput
          style={styles.postInput}
          placeholder="Share something with your network..."
          placeholderTextColor={Colors.GRAY_DARK}
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
            <ActivityIndicator color={Colors.WHITE} />
          ) : (
            <Text style={styles.postButtonText}>Post</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id} // ✅ CHANGED: back to `item.id`
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postInputContainer: {
    marginBottom: 15,
  },
  postInput: {
    borderWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    marginBottom: 10,
    backgroundColor: Colors.WHITE,
    fontSize: 16,
  },
  postButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  disabledButton: {
    backgroundColor: Colors.GRAY_LIGHT,
  },
  postButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: Colors.ERROR,
    marginBottom: 10,
    fontSize: 16,
  },
  retryButton: {
    padding: 10,
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: 8,
  },
  retryText: {
    color: Colors.PRIMARY,
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
    color: Colors.GRAY_DARK,
    fontSize: 16,
  },
});

export default FeedScreen;