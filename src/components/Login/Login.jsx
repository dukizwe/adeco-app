import { Center, Heading, Icon, NativeBaseProvider, Button, Input, useToast, WarningOutlineIcon } from 'native-base'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import { MaterialIcons } from "@expo/vector-icons"
import { primaryColor } from '../Welcome/styles'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { setUserAction } from '../../store/actions/userActions'
import fetchApi from '../../helpers/fetchApi'
import { useForm } from '../../hooks/useForm'
import { useFormErrorsHandle } from '../../hooks/useFormErrorsHandle'

export default function Login() {
          const [show, setShow] = useState(false)
          const [loading, setLoading] = useState(false)
          const toast = useToast()
          const dispatch = useDispatch()
          const [credetials, handleChange, setValue] = useForm({
                    email: '',
                    password: ''
          })
          const { errors, setErrors, getErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(credetials, {
                    email: 'required,email',
                    password: {
                              required: true,
                              length: [8]
                    }
          })

          const submitForm = async () => {
                    setLoading(true)
                    try  {
                              const { user } = await fetchApi('http://app.mediabox.bi:3140/login', {
                                        method: 'POST',
                                        body: JSON.stringify({email: credetials.email, password: credetials.password}),
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
                                                            {/* <Text>{JSON.stringify(getErrors())}</Text> */}
                                                            <View style={styles.form}>
                                                                      <Input isInvalid={hasError('email')} keyboardType='email-address' primaryColor='#000' placeholder="Email" w='full' size='lg' py={3} InputLeftElement={
                                                                                <Icon
                                                                                          as={<MaterialIcons name="email" />}
                                                                                          size={5}
                                                                                          ml="2"
                                                                                          color="muted.400"
                                                                                />}
                                                                                
                                                                                value={credetials.email}
                                                                                onChangeText={newValue => handleChange('email', newValue)}
                                                                                onBlur={e => checkFieldData('email')}
                                                                      />
                                                                      {hasError('email') && <Text style={{color: 'red', fontSize: 13}}>{getError('email')}</Text>}

                                                                      <Input isInvalid={hasError('password')} type={show ? 'text' : 'password'} mt={5} placeholder="Mot de passe" size='lg' py={3} InputLeftElement={
                                                                                <Icon
                                                                                          as={<MaterialIcons name="lock" />}
                                                                                          size={5}
                                                                                          ml="2"
                                                                                          color="muted.400"
                                                                                />}
                                                                                value={credetials.password}
                                                                                onChangeText={newValue => handleChange('password', newValue)}
                                                                                onBlur={e => checkFieldData('password')}
                                                                                InputRightElement={
                                                                                          <Icon
                                                                                                    as={<MaterialIcons name={show ? "visibility" : "visibility-off"} onPress={() => setShow(s => !s)}/>}
                                                                                                    size={8}
                                                                                                    mr="2"
                                                                                                    color="muted.400"
                                                                                          />}
                                                                      />
                                                                      {hasError('password') && <Text style={{color: 'red', fontSize: 13}}>{getError('password')}</Text>}
                                                            </View>
                                                            <View style={styles.actions}>
                                                                      <Button isDisabled={credetials.email == '' || credetials.password == ''} isLoading={loading} onPress={submitForm} size='lg' w="full" style={styles.login} py={4} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}>Se connecter</Button>
                                                            </View>
                                                  </Center>
                                        </View>
                              </Center>
                    </NativeBaseProvider>
          )
}