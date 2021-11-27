import { Center, Heading, Icon, Input, NativeBaseProvider, Button, useToast } from 'native-base'
import React, { useState } from 'react'
import { View } from 'react-native'
import styles from './styles'
import { MaterialIcons } from "@expo/vector-icons"
import { primaryColor } from '../Welcome/styles'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { setUserAction } from '../../store/actions/userActions'
import { fetchApi } from '../../functions'

export default function Login() {
          const [show, setShow] = useState(false)
          const [email, setEmail] = useState('')
          const [password, setPassword] = useState('')
          const [loading, setLoading] = useState(false)
          const toast = useToast()
          const dispatch = useDispatch()

          const submitForm = async () => {
                    setLoading(true)
                    try  {
                              const { user } = await fetchApi('http://app.mediabox.bi:3140/login', {
                                        method: 'POST',
                                        body: JSON.stringify({email, password}),
                                        headers: {
                                                  'Content-Type': 'application/json'
                                        }
                              })
                              setLoading(false)
                              await AsyncStorage.setItem('user', JSON.stringify(user))
                              dispatch(setUserAction(user))
                    } catch(error) {
                              setLoading(false)
                              toast.show({
                                        title: "Identifiant ou mot de passe incorrect",
                                        placement: "bottom",
                                        status: 'error',
                                        duration: 2000
                              })
                    }
                    /*const timeout = setTimeout(async () => {
                              setLoading(false)
                              try {
                                        const id = randomInt(55, 56)
                                        await AsyncStorage.setItem('user', JSON.stringify({email, password, id}))
                                        dispatch(setUserAction({email, password, id}))
                                        // navigation.navigate('Welcome')
                              } catch (error){
                                        console.log(error)
                              }
                    }, 2000)*/

          }
          return (
                    <NativeBaseProvider>
                              <Center flex={1} px='3' backgroundColor="#F2F5FE">
                                        <View style={styles.card}>
                                                  <Center flex={1}>
                                                            <Heading mt={5} mb={5} style={{ fontSize: 25}} >Connexion</Heading>
                                                            <View style={styles.form}>
                                                                      <Input keyboardType='email-address' primaryColor='#000' placeholder="Email" w='full' size='lg' py={3} InputLeftElement={
                                                                                <Icon
                                                                                          as={<MaterialIcons name="email" />}
                                                                                          size={5}
                                                                                          ml="2"
                                                                                          color="muted.400"
                                                                                />}
                                                                                value={email}
                                                                                onChangeText={newValue => setEmail(newValue)}
                                                                      />

                                                                      <Input type={show ? 'text' : 'password'} mt={5} placeholder="Mot de passe" size='lg' py={3} InputLeftElement={
                                                                                <Icon
                                                                                          as={<MaterialIcons name="lock" />}
                                                                                          size={5}
                                                                                          ml="2"
                                                                                          color="muted.400"
                                                                                />}
                                                                                value={password}
                                                                                onChangeText={newValue => setPassword(newValue)}
                                                                                InputRightElement={
                                                                                          <Icon
                                                                                                    as={<MaterialIcons name={show ? "visibility" : "visibility-off"} onPress={() => setShow(s => !s)}/>}
                                                                                                    size={8}
                                                                                                    mr="2"
                                                                                                    color="muted.400"
                                                                                          />}
                                                                      />
                                                            </View>
                                                            <View style={styles.actions}>
                                                                      <Button isDisabled={email == '' || password == ''} isLoading={loading} onPress={submitForm} size='lg' w="full" style={styles.login} py={4} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}>Se connecter</Button>
                                                            </View>
                                                  </Center>
                                        </View>
                              </Center>
                    </NativeBaseProvider>
          )
}