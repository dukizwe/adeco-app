import 'react-native-gesture-handler';
import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './src/AppContainer';
import { store } from './src/store'

export default function App() {
          return (
                    <>
                    <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
                    <Provider store={store}>
                              <NativeBaseProvider>
                                        <AppContainer />
                              </NativeBaseProvider>
                    </Provider>
                    </>
          );
}