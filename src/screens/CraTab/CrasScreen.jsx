import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { Input, Menu } from 'native-base';
import Activites from '../../components/Activites/Activites';

export default function CrasScreen() {
          const [search, setSearch] = useState('')
          return (
                    <View style={styles.container}>
                              <View style={styles.titleSearch}>
                                        <Text style={styles.other}>Mes CRA</Text>
                                        <Menu placement='left' style={styles.searchMenu} w="300" trigger={(triggerProps) => {return (
                                                            <TouchableOpacity style={styles.searchButton} {...triggerProps}>
                                                                      <AntDesign name="search1" size={24} color="black" />
                                                            </TouchableOpacity>
                                                            )
                                                  }}
                                                  >
                                                  <Menu.Item>
                                                            <Input autoFocus style={styles.searchInput}  value={search} onChangeText={(value) => setSearch(value)} mt={2} placeholder="Recherche..." size='lg' py={2} />
                                                  </Menu.Item>
                                        </Menu>
                              </View>
                              <Activites />
                    </View>
          )
}


const styles = StyleSheet.create({
          container: {
                    backgroundColor: '#fff',
                    height: '100%',
                    // marginTop: StatusBar.currentHeight
          },
          titleSearch: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          other: {
                    color: '#333',
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingLeft: 15,
          },
          searchButton: {
                    padding: 20
          },
          other: {
                    color: '#333',
                    paddingTop: 20,
                    paddingBottom: 20,
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    paddingRight: 15
          },
          input: {
                    borderBottomWidth: 2,
                    borderBottomColor: '#ddd',
          },
          fakeElement: {
                    position: 'absolute',
                    zIndex: 2,
                    backgroundColor: '#00000096',
                    width: '100%',
                    height: '100%'
          },
          searchMenu: {
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    margin: 0,
                    paddingTop: 0,
          },
          searchInput: {
                    backgroundColor: '#fff',
                    width: 280
          }
});
