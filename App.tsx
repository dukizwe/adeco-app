import 'react-native-gesture-handler';
import { StatusBar } from 'react-native'
import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './src/AppContainer';
import { store } from './src/store'
import { Host } from 'react-native-portalize';

export default function App() {
          return (
                    <>
                              <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
                              <Provider store={store}>
                                        <Host>
                                                  <AppContainer />
                                        </Host>
                              </Provider>
                    </>
          );
}