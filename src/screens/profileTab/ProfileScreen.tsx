import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelector';
import ProfileHeader from '../../components/profileTab/ProfileHeader';
import * as Progress from 'react-native-progress';
import ProfileLinks from '../../components/profileTab/ProfileLinks';
import * as ImagePicker from 'expo-image-picker';
import fetchApi from '../../utils/fetchApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserAction } from '../../store/actions/userActions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Loading from '../../components/app/Loading';


export default function ProfileScreen() {
          const user = useSelector(userSelector)
          const dispatch = useAppDispatch()
          const [loading, setLoading] = useState(false)

          const onImageChange = async () => {
                    try {
                              setLoading(true)
                              const image = await ImagePicker.launchImageLibraryAsync({
                                        mediaTypes: ImagePicker.MediaTypeOptions.Images
                              })
                              if (!image.cancelled) {
                                        const form = new FormData()
                                        let localUri = image.uri;
                                        let filename = localUri.split('/').pop();
                                        if (filename) {
                                                  let match = /\.(\w+)$/.exec(filename);
                                                  let type = match ? `image/${match[1]}` : `image`;
                                                  form.append(`image`, {
                                                            uri: localUri, name: filename, type
                                                  } as any)
                                        }
                                        const res = await fetchApi('/users/images', {
                                                  method: "PUT",
                                                  body: form
                                        })
                                        const newUser = {
                                                  ...user,
                                                  image: res.data.url
                                        }
                                        dispatch(setUserAction(newUser))
                                        await AsyncStorage.removeItem('user')
                                        await AsyncStorage.setItem('user', JSON.stringify(newUser))
                              }
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoading(false)
                    }
          }
          return (
                    <>
                              {loading && <Loading />}
                              <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                                        <ProfileHeader />
                                        <View style={styles.profileSection}>
                                                  <View style={styles.connectedUser}>
                                                            <TouchableWithoutFeedback onPress={onImageChange}>
                                                                      <View style={styles.userImage} >
                                                                                {user.image ? <Image source={{ uri: user.image }} style={styles.image} /> :
                                                                                          <Image source={require('../../../assets/images/man.jpg')} style={styles.image} />}
                                                                      </View>
                                                            </TouchableWithoutFeedback>
                                                            <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
                                                            <Text style={styles.profileRole}>{user.profileId.name}</Text>
                                                  </View>
                                                  <View style={styles.dashBoards}>
                                                            <View
                                                                      style={[styles.dashboard, { backgroundColor: '#1b3555' }]}
                                                            >
                                                                      <Progress.Circle
                                                                                size={70}
                                                                                progress={0.25}
                                                                                color={"#ffffff8a"}
                                                                                showsText strokeCap='round'
                                                                                textStyle={{ color: '#FFF' }}
                                                                      />
                                                                      <View style={styles.dashboardContent}>
                                                                                <Text style={styles.dashboardTitle}>Action</Text>
                                                                                <View style={styles.dashboardDetails}>
                                                                                          <View style={styles.detail}>
                                                                                                    <Text style={styles.detailLabel}>Total</Text>
                                                                                                    <Text style={styles.detailValue}>300 000 BIF</Text>
                                                                                          </View>
                                                                                          <View style={[styles.detail, { marginLeft: 20 }]}>
                                                                                                    <Text style={styles.detailLabel}>Evaluation</Text>
                                                                                                    <Text style={[styles.detailValue, { textAlign: "center" }]}>25%</Text>
                                                                                          </View>
                                                                                </View>
                                                                      </View>
                                                            </View>
                                                            <View
                                                                      style={[styles.dashboard, { marginTop: 15, backgroundColor: '#18a8c9' }]}
                                                            >
                                                                      <Progress.Circle
                                                                                size={70}
                                                                                progress={0.50}
                                                                                color={"#ffffff8a"}
                                                                                showsText strokeCap='round'
                                                                                textStyle={{ color: '#FFF' }}
                                                                      />
                                                                      <View style={styles.dashboardContent}>
                                                                                <Text style={styles.dashboardTitle}>Dettes</Text>
                                                                                <View style={styles.dashboardDetails}>
                                                                                          <View style={styles.detail}>
                                                                                                    <Text style={styles.detailLabel}>Total</Text>
                                                                                                    <Text style={styles.detailValue}>300 000 BIF</Text>
                                                                                          </View>
                                                                                          <View style={[styles.detail, { marginLeft: 20 }]}>
                                                                                                    <Text style={styles.detailLabel}>Evaluation</Text>
                                                                                                    <Text style={[styles.detailValue, { textAlign: "center" }]}>25%</Text>
                                                                                          </View>
                                                                                </View>
                                                                      </View>
                                                            </View>
                                                  </View>
                                                  <ProfileLinks />
                                        </View>
                              </ScrollView>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          profileSection: {
                    backgroundColor: '#f2f6f7',
                    flex: 1,
                    marginTop: 80
          },
          connectedUser: {
                    alignSelf: "center",
                    marginTop: -60
          },
          userImage: {
                    width: 120,
                    height: 120,
                    alignSelf: "center"
          },
          image: {
                    width: "100%",
                    height: "100%",
                    borderRadius: 15
          },
          profileName: {
                    color: '#000',
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 10,
          },
          profileRole: {
                    color: '#777',
                    textAlign: "center",
          },
          dashBoards: {
                    paddingHorizontal: 10,
                    marginTop: 20
          },
          dashboard: {
                    borderRadius: 40,
                    paddingHorizontal: 20,
                    paddingVertical: 30,
                    flexDirection: "row",
                    alignItems: "center"
          },
          progressCircle: {
                    borderColor: '#777',
                    borderWidth: 3,
                    width: 60,
                    height: 60,
                    borderRadius: 50
          },
          dashboardContent: {
                    marginLeft: 20
          },
          dashboardTitle: {
                    fontWeight: "bold",
                    color: '#FFF',
                    fontSize: 16
          },
          dashboardDetails: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15
          },
          detail: {

          },
          detailLabel: {
                    color: '#FFF',
                    opacity: 0.6
          },
          detailValue: {
                    color: '#FFF'
          }
})