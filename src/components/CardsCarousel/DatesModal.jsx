import React, { useState } from 'react'
import { Modal } from 'native-base'
import { StyleSheet, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import randomInt from '../../helpers/randomInt'
import { entries } from './CardsCarousel'
import { AntDesign } from '@expo/vector-icons'; 

export default function DatesModal({ showModal, setShowModal }) {
          return (<Modal isOpen={showModal} onClose={() => setShowModal(false)} size='xl'>
                    <Modal.Content maxWidth="400px">
                              <Modal.CloseButton />
                              <Modal.Body style={{marginTop: 25}}>
                                        <View style={styles.modalItem}>
                                                  <TextInput placeholder="Recherche..." style={styles.inputStyles} />
                                        </View>
                                        {entries.map((item, i) =>
                                                  <TouchableNativeFeedback
                                                            key={i.toString()}
                                                            accessibilityRole="button"
                                                            onPress={() => setShowModal(false)}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', false)}>
                                                                      <View style={styles.modalItem}>
                                                                                <Text style={styles.modalItemLabel} numberOfLines={2}>17 sep, 2021</Text>
                                                                                <View style={styles.checkSqaure}>{randomInt(1, 5) == i+1 && <AntDesign name="check" size={18} color="black" />}</View>
                                                                      </View>
                                                  </TouchableNativeFeedback>)}
                              </Modal.Body>
                    </Modal.Content>
          </Modal>)
}
const styles = StyleSheet.create({
          
          modalItem: {
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          checkSqaure: {
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: '#777',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center'
          },
          modalItemLabel: {
                    marginLeft: 5,
                    width: '90%'
          },
          inputStyles: {
                    borderWidth: 1,
                    borderColor: '#ddd',
                    width: '100%',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5
          }
})