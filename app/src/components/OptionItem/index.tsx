import React from 'react';
import {
  Image,
  ImageProps,
  Text, TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { styles } from './styles';


interface OptionItemProps extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}

export function OptionItem({ title, image, ...rest }: OptionItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      {...rest}
    >
      <Image
        source={image}
        style={styles.image}
      />

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}