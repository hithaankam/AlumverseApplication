// Post.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { likePost } from '@/services/AlumService';

export interface PostProps {
  id: string;
  authorId: string;
  authorName?: string; // Add author name field
  content: string;
  avatar?: string;
  likesCount?: number;
  comments?: number;
  timestamp?: string;
  image?: string;
  video?: string;
}

const formatRelativeTime = (timestamp: string | undefined): string => {
  if (!timestamp) return 'now';
  
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - postTime.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  
  return postTime.toLocaleDateString();
};

const Post = ({ post }: { post: PostProps }) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likesCount || 0);
  const [pressedButton, setPressedButton] = React.useState<string | null>(null);

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
          <Text style={styles.author}>{post.authorName || post.authorId}</Text>
          <Text style={styles.timestamp}>{formatRelativeTime(post.timestamp)}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {/* Image/Video Preview */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.mediaPreview} />
      )}
      {post.video && (
        <View style={styles.videoPreview}>
          <Ionicons name="play-circle" size={48} color={Colors.white} />
          <Text style={styles.videoText}>Video</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            pressedButton === 'like' && styles.pressedButton
          ]} 
          onPress={handleLike}
          onPressIn={() => setPressedButton('like')}
          onPressOut={() => setPressedButton(null)}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={20}
            color={liked ? '#FF3040' : (pressedButton === 'like' ? Colors.primary : Colors.gray400)}
          />
          {likeCount > 0 && (
            <Text style={styles.actionCount}>{likeCount}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.actionButton, 
            pressedButton === 'comment' && styles.pressedButton
          ]}
          onPressIn={() => setPressedButton('comment')}
          onPressOut={() => setPressedButton(null)}
        >
          <Ionicons 
            name="chatbubble-outline" 
            size={20} 
            color={pressedButton === 'comment' ? Colors.primary : Colors.gray400} 
          />
          {(post.comments || 0) > 0 && (
            <Text style={styles.actionCount}>{post.comments}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.actionButton, 
            pressedButton === 'share' && styles.pressedButton
          ]}
          onPressIn={() => setPressedButton('share')}
          onPressOut={() => setPressedButton(null)}
        >
          <Ionicons 
            name="share-outline" 
            size={20} 
            color={pressedButton === 'share' ? Colors.primary : Colors.gray400} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: Colors.white,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  author: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#70757A',
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
    color: '#202124',
    lineHeight: 24,
  },
  mediaPreview: {
    width: '100%',
    maxHeight: 300,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  videoPreview: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.black,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionLabel: {
    marginLeft: 6,
    color: Colors.gray500,
    fontSize: 14,
    fontWeight: '500',
  },
  actionCount: {
    marginLeft: 6,
    color: Colors.gray400,
    fontSize: 13,
  },
  likedLabel: {
    color: '#FF3040',
  },
  pressedButton: {
    backgroundColor: Colors.gray50,
  },
  pressedLabel: {
    color: Colors.primary,
  },
});

export default Post;