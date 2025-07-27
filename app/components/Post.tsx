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
            color={liked ? Colors.PRIMARY : Colors.GRAY_DARK}
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>
            {likeCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color={Colors.GRAY_DARK} />
          <Text style={styles.actionText}>{post.comments || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color={Colors.GRAY_DARK} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
    backgroundColor: Colors.WHITE,
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
    color: Colors.PRIMARY,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.GRAY_DARK,
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    color: Colors.GRAY_DARK,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_LIGHT,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  actionText: {
    marginLeft: 5,
    color: Colors.GRAY_DARK,
  },
  likedText: {
    color: Colors.PRIMARY,
  },
});

export default Post;