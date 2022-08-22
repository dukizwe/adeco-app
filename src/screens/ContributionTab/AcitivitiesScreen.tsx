import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Ionicons } from '@expo/vector-icons'; 
import { smallGreenWhiteColor } from "../../styles";


export default function AcitivitiesScreen() {
          return (
                    <View style={styles.container}>
                              <View style={styles.content}>
                                        <Text style={styles.title}>Activités</Text>
                                        <Image source={require('../../../assets/images/note_list_2.png')} style={styles.emptyImageFeedBack} />
                                        <Text style={styles.emptyTextFeedback}>
                                                  Cliquer sur le bouton <Ionicons name="add-circle-sharp" size={24} color={smallGreenWhiteColor} /> pour ajouter une activité
                                        </Text>
                              </View>
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', true)}>
                                        <View style={styles.addButton}>
                                                  <View style={styles.addButtonContent}>
                                                            <Ionicons name="add" size={24} color="black" />
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                    </View >
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    backgroundColor: '#fff'
          },
          subContent: {
                    flexDirection: "row",
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 10,
                    zIndex: 1,
                    position: "absolute",
                    bottom: 5,
          },
          addButton: {
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#000',
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
          },
          addButtonContent: {
                    width: '70%',
                    height: '70%',
                    borderRadius: 15,
                    backgroundColor: smallGreenWhiteColor,
                    justifyContent: 'center',
                    alignItems: 'center'
          },

          content: {
                    alignItems: 'center'
          },
          title: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 30
          },
          emptyImageFeedBack: {
                    maxWidth: '80%',
                    maxHeight: '30%',
                    marginVertical: 60
          },
          emptyTextFeedback: {
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 22,
                    color: '#5E5E5E'
          }
})