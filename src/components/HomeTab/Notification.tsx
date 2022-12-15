import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { NotificationInterface } from '../../interfaces/api/NotificationInterface'
import moment from 'moment'

export default function Notification({ notification }: { notification: NotificationInterface}) {
          return (
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#C4C4C4', false)}>
                              <View style={styles.notification}>
                                        {notification.fromUserId.image ? <Image source={{ uri: notification.fromUserId.image }} style={styles.image} /> :
                                        <Image source={require('../../../assets/images/man.jpg')} style={styles.image} />}
                                        <View style={styles.content}>
                                                  <View style={styles.contentHeader}>
                                                            <Text style={styles.title}>
                                                                      { notification.fromUserId.firstName } { notification.fromUserId.lastName }
                                                            </Text>
                                                            <Text style={styles.date}>
                                                                      {moment(notification.createdAt).calendar(null, {
                                                                                sameDay: "[Ajourd'hui]",
                                                                                lastDay: "[Hier]",
                                                                                nextDay: 'DD-MM-YYYY',
                                                                                lastWeek: 'DD-MM-YYYY',
                                                                                sameElse: 'DD-MM-YYYY',
                                                                      })}, {moment(notification.createdAt).format('HH:mm')}
                                                            </Text>
                                                  </View>
                                                  <Text style={styles.body} numberOfLines={3}>
                                                            { notification.body }
                                                  </Text>
                                        </View>
                              </View>
                    </TouchableNativeFeedback>
          )
}

const styles = StyleSheet.create({
          notification: {
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderBottomWidth: 2,
                    borderBottomColor: '#F1F1F1',
                    flexDirection: "row"
          },
          image: {
                    width: 45,
                    height: 45,
                    borderRadius: 45
          },
          content: {
                    marginLeft: 10,
                    flex: 1
          },
          contentHeader: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
          },
          title: {
                    color: '#333',
                    fontWeight: "bold"
          },
          date: {
                    color: '#777',
                    fontSize: 12
          },
          body: {
                    fontSize: 13,
                    color: '#333'
          }
})