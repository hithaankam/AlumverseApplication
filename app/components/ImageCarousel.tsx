import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const carouselImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', 
  'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800'
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % carouselImages.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={[styles.arrow, styles.leftArrow]} onPress={handlePrevious}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>

        <Image 
          source={{ uri: carouselImages[currentIndex] }} 
          style={styles.image} 
          resizeMode="cover" 
        />

        <TouchableOpacity style={[styles.arrow, styles.rightArrow]} onPress={handleNext}>
          <Ionicons name="chevron-forward" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.pagination}>
        {carouselImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, index === currentIndex ? styles.activeDot : styles.inactiveDot]}
            onPress={() => setCurrentIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: width * 0.9,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    backgroundColor: Colors.gray300,
  },
});

export default ImageCarousel;
