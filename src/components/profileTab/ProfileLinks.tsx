import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { COLORS } from '../../styles/COLORS';

export default function ProfileLinks() {
          return (
                    <View style={styles.profileLinks}>
                              <TouchableNativeFeedback>
                                        <View style={styles.profileButton}>
                                                  <View style={styles.buttonLeftSide}>
                                                            <View style={[styles.buttonIcon, { backgroundColor: '#1b3555' }]}>
                                                                      <Image source={require('../../../assets/icons/debt-white.png')} style={styles.icon} />
                                                            </View>
                                                            <View style={styles.buttonLabels}>
                                                                      <Text style={styles.buttonTitle}>Dette</Text>
                                                                      <Text style={styles.buttonDescription}>
                                                                                Votre dette actuelle
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.buttonRightSide}>
                                                            <MaterialIcons name="navigate-next" size={24} color="#777" />
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <TouchableNativeFeedback>
                                        <View style={styles.profileButton}>
                                                  <View style={styles.buttonLeftSide}>
                                                            <View style={[styles.buttonIcon, { backgroundColor: '#873475' }]}>
                                                                      <MaterialCommunityIcons name="account-group" size={24} color="#FFF" />
                                                            </View>
                                                            <View style={styles.buttonLabels}>
                                                                      <Text style={styles.buttonTitle}>Invitations</Text>
                                                                      <Text style={styles.buttonDescription}>
                                                                                Les demandes d'intégration
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.buttonRightSide}>
                                                            <View style={styles.badge}>
                                                                      <Text style={styles.badgeText}>1</Text>
                                                            </View>
                                                            <MaterialIcons name="navigate-next" size={24} color="#777" />
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <TouchableNativeFeedback>
                                        <View style={styles.profileButton}>
                                                  <View style={styles.buttonLeftSide}>
                                                            <View style={[styles.buttonIcon, { backgroundColor: '#97D4E7' }]}>
                                                                      <AntDesign name="edit" size={24} color={"#FFF"} />
                                                            </View>
                                                            <View style={styles.buttonLabels}>
                                                                      <Text style={styles.buttonTitle}>Modifier le profil</Text>
                                                                      <Text style={styles.buttonDescription}>
                                                                                Modifier votre nom, email et autres
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.buttonRightSide}>
                                                            <MaterialIcons name="navigate-next" size={24} color="#777" />
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <TouchableNativeFeedback>
                                        <View style={styles.profileButton}>
                                                  <View style={styles.buttonLeftSide}>
                                                            <View style={[styles.buttonIcon, { backgroundColor: '#3555a2' }]}>
                                                                      <Feather name="settings" size={24} color="#FFF" />
                                                            </View>
                                                            <View style={styles.buttonLabels}>
                                                                      <Text style={styles.buttonTitle}>Paramètres</Text>
                                                                      <Text style={styles.buttonDescription}>
                                                                                Ajuster vos préfèrences
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.buttonRightSide}>
                                                            <MaterialIcons name="navigate-next" size={24} color="#777" />
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <TouchableNativeFeedback>
                                        <View style={styles.profileButton}>
                                                  <View style={styles.buttonLeftSide}>
                                                            <View style={[styles.buttonIcon, { backgroundColor: '#5d647f' }]}>
                                                                      <MaterialIcons name="logout" size={24} color="#FFF" />
                                                            </View>
                                                            <View style={styles.buttonLabels}>
                                                                      <Text style={styles.buttonTitle}>Déconnexion</Text>
                                                                      <Text style={styles.buttonDescription}>
                                                                                Fermer votre session pour cet appareil
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.buttonRightSide}>
                                                            <MaterialIcons name="navigate-next" size={24} color="#777" />
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                    </View>
          )
}

const styles = StyleSheet.create({
          profileLinks: {
                    marginTop: 10
          },
          profileButton: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    borderTopWidth: 0.5,
                    borderTopColor: '#ddd'
          },
          buttonLeftSide: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          buttonIcon: {
                    width: 50,
                    height: 50,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
          },
          icon: {
                    width: 25,
                    height: 25
          },
          buttonRightSide: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          buttonLabels: {
                    marginLeft: 10
          },
          buttonTitle: {
                    fontWeight: "bold"
          },
          buttonDescription: {
                    color: '#777',
                    fontSize: 12
          },
          badge: {
                    backgroundColor: 'red',
                    minWidth: 25,
                    height: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    opacity: 0.8,
                    paddingHorizontal: 2
          },
          badgeText: {
                    fontWeight: "bold",
                    color: '#FFF',
                    fontSize: 12
          }
})