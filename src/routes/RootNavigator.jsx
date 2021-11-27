import React from 'react'
import HomeNavigator from '../routes/HomeNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from '../screens/Settings/SettingScreen';
import DrawerContent from '../components/DrawerContent/DrawerContent';

const Drawer = createDrawerNavigator()

export default function RootNavigator() {
          return (
                    <Drawer.Navigator screenOptions={{drawerPosition: 'right', headerShown: false /* header: () => <Header /> */}} drawerContent={props => <DrawerContent {...props} /> }>
                              <Drawer.Screen name="Home" component={HomeNavigator} />
                              <Drawer.Screen name="Settings" component={SettingScreen} />
                    </Drawer.Navigator>
          )
}
