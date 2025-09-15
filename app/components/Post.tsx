// Post.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { likePost } from '@/services/AlumService';

export interface PostProps {
  id: string; // ✅ CHANGED: back to `id`
  authorId: string;
  content: string;
  avatar?: string;
  likesCount?: number;
  comments?: number;
  timestamp?: string;
}

const Post = ({ post }: { post: PostProps }) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likesCount || 0);

  const handleLike = async () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);

    try {
      await likePost(post.id, 'current-user-id'); // ✅ CHANGED: back to `post.id`
    } catch (err) {
      setLiked(!newLikedState);
      setLikeCount(newLikedState ? likeCount : likeCount + 1);
      console.error('Error liking post:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: post.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.author}>{post.authorId}</Text>
          <Text style={styles.timestamp}>{post.timestamp || '2h ago'}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={20}
            color={liked ? Colors.error : Colors.gray400} // Use error color for liked, gray for unliked
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={Colors.gray400} />
          <Text style={styles.actionText}>{post.comments || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={Colors.gray400} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 10, // Add margin bottom for separation between posts
    borderRadius: 10,
    backgroundColor: Colors.white, // White background for posts
    borderWidth: 1,
    borderColor: Colors.gray100, // Subtle border
    shadowColor: Colors.black, // Add subtle shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // For Android shadow
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.gray600, // Darker gray for author name
  },
  timestamp: {
    fontSize: 12,
    color: Colors.gray400, // Medium gray for timestamp
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    color: Colors.gray500, // Dark gray for post content
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100, // Light gray for action separator
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  actionText: {
    marginLeft: 5,
    color: Colors.gray500, // Dark gray for action text
  },
  likedText: {
    color: Colors.error, // Error color for liked text
  },
});

export default Post;