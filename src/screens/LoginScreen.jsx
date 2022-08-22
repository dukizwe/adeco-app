import React, { useRef } from 'react'
import Login from "../components/Login/Login";
import { Modalize } from 'react-native-modalize';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Input } from 'native-base';

export default function LoginScreen() {
          const modalizeRef = useRef(null);
          const onOpen = () => {
                    modalizeRef.current?.open();
          };
          return (
                    <>
                    {/* <Login /> */}
                    <TouchableOpacity onPress={onOpen}>
                              <Text>Open the modal</Text>
                    </TouchableOpacity>

                              <Modalize
                                        ref={modalizeRef}
                                        adjustToContentHeight
                                        scrollViewProps={{
                                                  keyboardShouldPersistTaps: 'always'
                                        }}
                              >
                                        <View >
                                                  <TouchableOpacity onPress={() => modalizeRef.current?.close()}>
                                                            <Text>Close</Text>
                                                  </TouchableOpacity>
                                                  <Text style={{ marginVertical: 100 }}>hey there</Text>
                                                  <Input />
                                        </View>
                              </Modalize>
                    </>
          )
}