import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, ActivityIndicator, Keyboard } from 'react-native'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { primaryColor } from '../../styles';
import { useForm } from '../../hooks/useForm';
import { useFormErrorsHandle } from '../../hooks/useFormErrorsHandle';
import fetchApi from '../../utils/fetchApi';
import wait from '../../helpers/wait';
import ErrorModal from '../../components/Modals/ErrorModal';
import { ApiResponse } from '../../types/ApiResponse';
import { Status } from '../../enum/status.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';

type Inputs = "email" | "password" | undefined

export default function LoginScreen() {
          const [showPassword, setShowPassword] = useState(false)
          const { height } = useWindowDimensions()
          const passwordInputRef = useRef<TextInput>(null)
          const statusBarHeight = StatusBar.currentHeight || 0
          const [isFocused, setIsFocused] = useState<Inputs>(undefined)

          const [isLoading, setIsLoading] = useState(false)
          const [isMainError, setIsMainError] = useState(false)

          const dispatch = useDispatch()

          const [data, handleChange] = useForm({
                    email: "",
                    password: ""
          })
          const { isValidate, hasError, getError, checkFieldData } = useFormErrorsHandle(data, {
                    email: {
                              required: true,
                              email: true,
                    },
                    password: {
                              required: true
                    }
          }, {
                    email: {
                              required: "L'email est requis",
                              email: "Email invalide"
                    },
                    password: {
                              required: "Le mot de passe est requis"
                    }
          })

          const handleLogin = async () => {
                    try {
                              setIsLoading(true)
                              const res = await fetchApi('/auth/login', {
                                        method: "POST",
                                        body: JSON.stringify({
                                                  email: data.email,
                                                  password: data.password
                                        }),
                                        headers: { "Content-Type": "application/json" }
                              })
                              const user = res.data
                              await AsyncStorage.setItem('user', JSON.stringify(user))
                              dispatch(setUserAction(user))
                    } catch (error: any) {
                              console.log(error)
                              const apiError: ApiResponse = error
                              if(apiError.httpStatus == Status.UNAUTHORIZED) {
                                        setIsMainError(true)
                              }
                    } finally {
                              setIsLoading(false)
                    }
          }
          return (
                    <>
                    {isMainError && <ErrorModal onClose={() => setIsMainError(false)} />}
                    <View style={styles.container}>
                              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                                        <Image source={require('../../../assets/illustrators/login.png')} style={{ ...styles.image, resizeMode: 'center', height: (30 * height - statusBarHeight) / 100 }} />
                                        <Text style={styles.title}>
                                                  Connexion
                                        </Text>
                                        <View style={styles.inputs}>
                                                  <View style={[styles.input, isFocused == "email" && { borderBottomColor: primaryColor }, hasError('email') && { borderBottomColor: 'red'}]}>
                                                            <TextInput
                                                                      placeholder='Email'
                                                                      style={styles.textInput}
                                                                      returnKeyType="next"
                                                                      blurOnSubmit={false}
                                                                      onSubmitEditing={() => {
                                                                                passwordInputRef.current?.focus()
                                                                      }}
                                                                      autoComplete="off"
                                                                      value={data.email}
                                                                      onChangeText={t => handleChange('email', t)}
                                                                      onFocus={() => setIsFocused('email')}
                                                                      onBlur={() => {
                                                                                setIsFocused(undefined)
                                                                                checkFieldData('email')
                                                                      }}
                                                                      editable={!isLoading}
                                                            />
                                                            <View style={styles.inputLeftSide}>
                                                                      <View style={styles.InputLeftElement}>
                                                                                <MaterialIcons name="alternate-email" size={20} color="#777" />
                                                                      </View>
                                                            </View>
                                                  </View>
                                                  {hasError('email') && <Text style={styles.invalidFeedback}>{ getError('email') }</Text>}

                                                  <View style={[styles.input, { marginTop: 10 }, isFocused == "password" && { borderBottomColor: primaryColor }, hasError('password') && { borderBottomColor: 'red'}]}>
                                                            <TextInput
                                                                      placeholder='Mot de passe'
                                                                      secureTextEntry={!showPassword}
                                                                      style={styles.textInput}
                                                                      blurOnSubmit={false}
                                                                      ref={passwordInputRef}
                                                                      value={data.password}
                                                                      onChangeText={t => handleChange('password', t)}
                                                                      onFocus={() => setIsFocused('password')}
                                                                      onBlur={() => {
                                                                                setIsFocused(undefined)
                                                                                checkFieldData('password')
                                                                      }}
                                                                      editable={!isLoading}
                                                                      returnKeyType="go"
                                                                      onSubmitEditing={() => {
                                                                                Keyboard.dismiss()
                                                                                if(!isValidate()) {
                                                                                          return false
                                                                                }
                                                                                handleLogin()
                                                                      }}
                                                            />
                                                            <View style={styles.inputLeftSide}>
                                                                      <View style={styles.InputLeftElement}>
                                                                                <Ionicons name="lock-closed-outline" size={20} color="#777" />
                                                                      </View>
                                                            </View>
                                                            <TouchableWithoutFeedback style={styles.InputRightElement} onPress={() => setShowPassword(t => !t)}>
                                                                      <Ionicons name={!showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#777" />
                                                            </TouchableWithoutFeedback>
                                                  </View>
                                                  {hasError('password') && <Text style={styles.invalidFeedback}>{ getError('password') }</Text>}
                                        </View>
                                        <TouchableOpacity>
                                                  <Text style={styles.forgetPass}>Mot de passe oublié</Text>
                                        </TouchableOpacity>
                                        <TouchableNativeFeedback useForeground disabled={!isValidate() || isLoading} onPress={handleLogin}>
                                                  <View style={[styles.submitBtn, !isValidate() && { opacity: 0.5 }]}>
                                                            <View style={{ backgroundColor: primaryColor, paddingVertical: 15 }}>
                                                                      {isLoading ? <View style={styles.loadingWrapper}>
                                                                                <ActivityIndicator animating color={"#fff"} />
                                                                                <Text style={[styles.submitBtnText, { marginLeft: 10 }]}>
                                                                                          Traitement...
                                                                                </Text>
                                                                      </View> :<Text style={styles.submitBtnText}>
                                                                                Se connecter
                                                                      </Text>}
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <Text style={styles.orLabel}>Ou</Text>
                                        <View style={styles.socials}>
                                                  <TouchableOpacity style={{ ...styles.social }}>
                                                            <Image source={require('../../../assets/images/google.png')} style={styles.socialImage} />
                                                            <Text style={styles.socialTitle}>Continuer avec Google</Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: 30 }}>
                                                  <Text style={styles.toRegisterText}>
                                                            Nouveau membre ?
                                                  </Text>
                                                  <TouchableOpacity>
                                                            <Text style={styles.registerText} >Créer un compte</Text>
                                                  </TouchableOpacity>
                                        </View>
                              </ScrollView>
                    </View>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    paddingHorizontal: 20,
                    backgroundColor: '#FFF',
                    flex: 1
          },
          image: {
                    // maxHeight: '30%',
                    maxWidth: '80%',
                    alignSelf: 'center'
          },
          title: {
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 25,
                    opacity: 0.8
          },
          inputs: {

          },
          input: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#ddd',
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 50
          },
          invalidFeedback: {
                    fontSize: 12,
                    color: 'red'
          },
          inputLeftSide: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          InputLeftElement: {

          },
          InputRightElement: {
                    marginRight: 10
          },
          textInput: {
                    paddingVertical: 5,
                    paddingLeft: 30,
                    position: "absolute",
                    height: "100%",
                    width: "100%"
          },
          forgetPass: {
                    color: primaryColor,
                    textAlign: 'right',
                    marginTop: 10,
                    fontWeight: 'bold'
          },
          orLabel: {
                    color: '#777',
                    textAlign: 'center',
                    marginVertical: 30,
                    fontSize: 12
          },
          submitBtn: {
                    overflow: "hidden",
                    marginTop: 15,
                    borderRadius: 10
          },
          loadingWrapper:  {
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center"
          },
          submitBtnText: {
                    color: '#FFF',
                    fontWeight: "bold",
                    textAlign: "center"
          },
          socials: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
          },
          social: {
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    height: 50,
                    backgroundColor: '#F1F1F1',
                    flexDirection: "row",
          },
          socialImage: {
                    width: 25,
                    height: 25,
          },
          socialTitle: {
                    marginLeft: 10,
                    color: '#777'
          },
          toRegisterText: {
                    color: '#777',
                    textAlign: 'center',
                    fontSize: 13,
          },
          registerText: {
                    color: primaryColor,
                    // textDecorationLine: 'underline',
                    marginLeft: 5,
                    textAlign: 'center',
                    fontSize: 13
          },
})