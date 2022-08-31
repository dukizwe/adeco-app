import React, { useRef } from 'react'
import Login from "../components/Login/Login";
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'native-base';

export default function LoginScreen() {
          const modalizeRef = useRef(null);
          const onOpen = () => {
                    modalizeRef.current?.open();
          };
          return <Login />
}