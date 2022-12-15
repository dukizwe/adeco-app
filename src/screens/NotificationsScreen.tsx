import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import Notification from '../components/HomeTab/Notification';
import { NotificationInterface } from '../interfaces/api/NotificationInterface';
import fetchApi from '../utils/fetchApi';
import ContributorsSkeletons from '../components/skeleton/Skeleton';
import LottieView from 'lottie-react-native'

export default function NotificationsScreen() {
          const [notifications, setNotifications] = useState<NotificationInterface[]>([])
          const [loading, setLoading] = useState(true)
          useEffect(() => {
                    (async () => {
                              try {
                                        const notfs = await fetchApi('/notifications')
                                        setNotifications(notfs.data)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, [])
          return (
                    <View style={styles.container}>
                              <View style={styles.header}>
                                        <Text style={styles.title}>
                                                  Notifications
                                        </Text>
                                        <Entypo name="dots-three-horizontal" size={24} color="black" />
                              </View>
                              {loading ? <ContributorsSkeletons /> :
                                        notifications.length == 0 ? <View style={styles.emptyContainer}>
                                                  <LottieView
                                                            style={{ width: "100%", height: 200  }}
                                                            source={require('../../assets/lotties/notifications.json')}
                                                            autoPlay
                                                  />
                                                  <Text style={styles.emptyFeedback}>
                                                            Aucune notification
                                                  </Text>
                                        </View> :
                                                  <FlatList
                                                            data={notifications}
                                                            renderItem={({ item, index }) => {
                                                                      return (
                                                                                <Notification notification={item} />
                                                                      )
                                                            }}
                                                            style={styles.notifications}
                                                  />}
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          header: {
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    borderBottomWidth: 2,
                    borderBottomColor: '#F1F1F1',
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
          },
          title: {
                    fontWeight: "bold",
                    fontSize: 16
          },
          notifications: {
                    marginBottom: 80
          },
          emptyContainer: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
          },
          emptyFeedback: {
                    color: '#777'
          }
})