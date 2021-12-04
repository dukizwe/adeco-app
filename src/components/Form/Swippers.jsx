import React, { useRef, useState } from 'react'
import Swiper from 'react-native-swiper'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
// import { Input } from './Form'
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from 'native-base'
import { primaryColor } from '../Welcome/styles'
import { useForm } from '../../hooks/useForm'
import { Input } from 'native-base'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core'


export default function Swippers() {
          const swipper = useRef(null)
          const [credetials, handleChange, setValue] = useForm({
                    nom: '',
                    prenom: '',
                    tel: ''
          })
          const [index, setIndex] = useState(0)
          const navigation = useNavigation()
          const goBack = () => {
                    if(index === 0) {
                              navigation.goBack()
                    } else {
                              swipper.current.scrollBy(-1, true)
                    }
          }
          return (
                    <>
                    <View style={styles.header}>
                              <TouchableOpacity onPress={() => goBack()} style={{width: 50, height: 30, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                              </TouchableOpacity>
                    </View>
                    <Swiper ref={swipper} style={styles.wrapper} showsButtons={false} scrollEnabled={false} keyboardShouldPersistTaps='handled' index={index} onIndexChanged={index => setIndex(index)}>
                              <View style={styles.slide}>
                                        
                                        <View style={styles.formContainer}>
                                                  <Text style={styles.slideTitle}>Mon nom est</Text>
                                                  <Input value={credetials.nom} onChangeText={newValue => handleChange('nom', newValue)} primaryColor='#000' placeholder="Nom" w='full' size='lg' py={3} style={styles.inputStyles} />
                                                  <View style={styles.actions}>
                                                            <Button isDisabled={credetials.nom == ''} onPress={() => swipper.current.scrollBy(1, true)} size='lg' w="full" style={styles.login} py={3} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}>Suivant</Button>
                                                  </View>
                                        </View>
                              </View>
                              <View style={styles.slide}>
                                        <View style={styles.formContainer}>
                                                  <Text style={styles.slideTitle}>Mon prénom est</Text>
                                                  <Input value={credetials.prenom} onChangeText={newValue => handleChange('prenom', newValue)} primaryColor='#000' placeholder="Prénom" w='full' size='lg' py={3} style={styles.inputStyles} />
                                                  <View style={styles.actions}>
                                                            <Button isDisabled={credetials.prenom == ''} onPress={() => swipper.current.scrollBy(1, true)} size='lg' w="full" style={styles.login} py={3} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}>Suivant</Button>
                                                  </View>
                                        </View>
                              </View>
                              <View style={styles.slide}>
                                        <View style={styles.formContainer}>
                                                  <Text style={styles.slideTitle}>Numéro de téléphone</Text>
                                                  <Input value={credetials.tel} onChangeText={newValue => handleChange('tel', newValue)} keyboardType='number-pad' primaryColor='#000000' placeholder="Numéro" w='full' size='lg' py={3} style={styles.inputStyles} />
                                                  <View style={styles.actions}>
                                                            <Button isDisabled={credetials.tel == ''} size='lg' w="full" style={styles.login} py={3} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}>Suivant</Button>
                                                  </View>
                                        </View>
                              </View>
                    </Swiper>
                    </>
          )
}
const { width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
          header: {
                    paddingTop: 40,
                    paddingHorizontal: 20,
                    backgroundColor: '#fff'
          },
          wrapper: {
                    backgroundColor: '#fff',
          },
          formContainer: {
                    height: '100%',
                    width: '100%',
                    paddingHorizontal: 40,
                    justifyContent: 'space-around'
          },
          slideTitle: {
                    fontSize: 50,
                    color: '#000',
                    opacity: 0.6,
                    marginVertical: 50
          },
          inputStyles: {
                    borderWidth: 0,
                    borderBottomWidth: 2,
                    borderBottomColor: '#ddd',
                    fontSize: 30,
                    color: '#000',
                    opacity: 0.6
          },
          slide: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
          },
})