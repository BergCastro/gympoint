import React from 'react';
import { Image } from 'react-native';
import logo from '~/assets/logo2.png';
import { ContainerImage } from './styles';

export default function HeaderLogo() {
  return (
    <ContainerImage>
      <Image source={logo} />
    </ContainerImage>
  );
}
