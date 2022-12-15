import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions, ScrollView, StatusBar, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, ActivityIndicator, Keyboard } from 'react-native'
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
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
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../hooks/useAppSelector';
import { pushTokenSelector } from '../../store/selectors/appSelectors';

type Inputs = 'lastname' | 'firstname' | "email" | "password" | "passwordConfirm" | undefined

export default function RegisterScreen() {
          const [showPassword, setShowPassword] = useState(false)
          const { height } = useWindowDimensions()

          const firstnameRef = useRef<TextInput>(null)
          const emailRef = useRef<TextInput>(null)
          const passwordInputRef = useRef<TextInput>(null)
          const passwordConfirmInputRef = useRef<TextInput>(null)

          const statusBarHeight = StatusBar.currentHeight || 0
          const [isFocused, setIsFocused] = useState<Inputs>(undefined)

          const [isLoading, setIsLoading] = useState(false)
          const [isMainError, setIsMainError] = useState(false)

          const dispatch = useDispatch()
          const navigation = useNavigation()
          const pushToken = useAppSelector(pushTokenSelector)

          const [data, handleChange] = useForm({
                    lastname: '',
                    firstname: '',
                    email: "",
                    password: "",
                    passwordConfirm: ""
          })
          const { isValidate, hasError, getError, checkFieldData, setErrors } = useFormErrorsHandle(data, {
                    lastname: {
                              required: true,
                    },
                    firstname: {
                              required: true,
                    },
                    email: {
                              required: true,
                              email: true,
                    },
                    password: {
                              required: true,
                              length: [8]
                    },
                    passwordConfirm: {
                              required: true,
                              match: "password"
                    }
          }, {
                    lastname: {
                              required: "Le nom est requis",
                    },
                    firstname: {
                              required: "Le prénom est requis",
                    },
                    email: {
                              required: "L'email est requis",
                              email: "Email invalide"
                    },
                    password: {
                              required: "Le mot de passe est requis",
                              length: "Mot de passe trop court"
                    },
                    passwordConfirm: {
                              required: "Ce champ est requis",
                              match: "Les mots de passe ne correpondent pas"
                    }
          })

          const handleRegister = async () => {
                    try {
                              setIsLoading(true)
                              const res = await fetchApi('/auth/register', {
                                        method: "POST",
                                        body: JSON.stringify({
                                                  firstName: data.firstname,
                                                  lastName: data.lastname,
                                                  email: data.email,
                                                  password: data.password,
                                                  pushNotificationToken: pushToken ? pushToken : undefined
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
                              if(apiError.httpStatus == Status.UNPROCESSABLE_ENTITY && apiError.data.errors) {
                                        setErrors(apiError.data.errors)
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
                                        <Image source={require('../../../assets/illustrators/new-register.png')} style={{ ...styles.image, resizeMode: 'center', height: (30 * height - statusBarHeight) / 100 }} />
                                        <Text style={styles.title}>
                                                  Inscription
                                        </Text>
                                        {/* <TouchableNativeFeedback>
                                                  <View style={styles.userImage} >
                                                            <Image source={require('../../../assets/girl.jpg')} style={styles.profilePhoto} />
                                                  </View>
                                        </TouchableNativeFeedback> */}
                                        <View style={styles.inputs}>
                                                  <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}>
                                                            <View style={{ flex: 1 }}>
                                                                      <View style={[styles.input, isFocused == "lastname" && { borderBottomColor: primaryColor }, hasError('lastname') && { borderBottomColor: 'red',}, { marginRight: 10 }]}>
                                                                                <TextInput
                                                                                          placeholder='Nom'
                                                                                          style={styles.textInput}
                                                                                          returnKeyType="next"
                                                                                          blurOnSubmit={false}
                                                                                          onSubmitEditing={() => {
                                                                                                    firstnameRef.current?.focus()
                                                                                          }}
                                                                                          autoComplete="off"
                                                                                          value={data.lastname}
                                                                                          onChangeText={t => handleChange('lastname', t)}
                                                                                          onFocus={() => setIsFocused('lastname')}
                                                                                          onBlur={() => {
                                                                                                    setIsFocused(undefined)
                                                                                                    checkFieldData('lastname')
                                                                                          }}
                                                                                          editable={!isLoading}
                                                                                          
                                                                                />
                                                                                <View style={styles.inputLeftSide}>
                                                                                          <View style={styles.InputLeftElement}>
                                                                                                    <Feather name="user" size={20} color="#777" />
                                                                                          </View>
                                                                                </View>
                                                                      </View>
                                                                      {hasError('lastname') && <Text style={styles.invalidFeedback}>{ getError('lastname') }</Text>}
                                                            </View>
                                                            <View style={{ flex: 1 }}>
                                                                      <View style={[styles.input, isFocused == "firstname" && { borderBottomColor: primaryColor }, hasError('firstname') && { borderBottomColor: 'red',}, { marginLeft: 10 }]}>
                                                                                <TextInput
                                                                                          placeholder='Prénom'
                                                                                          style={styles.textInput}
                                                                                          returnKeyType="next"
                                                                                          blurOnSubmit={false}
                                                                                          ref={firstnameRef}
                                                                                          onSubmitEditing={() => {
                                                                                                    emailRef.current?.focus()
                                                                                          }}
                                                                                          autoComplete="off"
                                                                                          value={data.firstname}
                                                                                          onChangeText={t => handleChange('firstname', t)}
                                                                                          onFocus={() => setIsFocused('firstname')}
                                                                                          onBlur={() => {
                                                                                                    setIsFocused(undefined)
                                                                                                    checkFieldData('firstname')
                                                                                          }}
                                                                                          editable={!isLoading}
                                                                                />
                                                                                <View style={styles.inputLeftSide}>
                                                                                          <View style={styles.InputLeftElement}>
                                                                                                    <Feather name="user" size={20} color="#777" />
                                                                                          </View>
                                                                                </View>
                                                                      </View>
                                                                      {hasError('firstname') && <Text style={styles.invalidFeedback}>{ getError('firstname') }</Text>}
                                                            </View>
                                                  </View>

                                                  <View style={[styles.input, isFocused == "email" && { borderBottomColor: primaryColor }, hasError('email') && { borderBottomColor: 'red'}]}>
                                                            <TextInput
                                                                      placeholder='Email'
                                                                      style={styles.textInput}
                                                                      returnKeyType="next"
                                                                      blurOnSubmit={false}
                                                                      ref={emailRef}
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
                                                                      returnKeyType="next"
                                                                      onSubmitEditing={() => {
                                                                                passwordConfirmInputRef.current?.focus()
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


                                                  <View style={[styles.input, { marginTop: 10 }, isFocused == "passwordConfirm" && { borderBottomColor: primaryColor }, hasError('passwordConfirm') && { borderBottomColor: 'red'}]}>
                                                            <TextInput
                                                                      placeholder='Confirmer le mot de passe'
                                                                      secureTextEntry={!showPassword}
                                                                      style={styles.textInput}
                                                                      blurOnSubmit={false}
                                                                      ref={passwordConfirmInputRef}
                                                                      value={data.passwordConfirm}
                                                                      onChangeText={t => handleChange('passwordConfirm', t)}
                                                                      onFocus={() => setIsFocused('passwordConfirm')}
                                                                      onBlur={() => {
                                                                                setIsFocused(undefined)
                                                                                checkFieldData('passwordConfirm')
                                                                      }}
                                                                      editable={!isLoading}
                                                                      returnKeyType="go"
                                                                      onSubmitEditing={() => {
                                                                                Keyboard.dismiss()
                                                                                if(!isValidate()) {
                                                                                          return false
                                                                                }
                                                                                handleRegister()
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
                                                  {hasError('passwordConfirm') && <Text style={styles.invalidFeedback}>{ getError('passwordConfirm') }</Text>}
                                        </View>
                                        <TouchableNativeFeedback useForeground disabled={!isValidate() || isLoading} onPress={handleRegister}>
                                                  <View style={[styles.submitBtn, !isValidate() && { opacity: 0.5 }]}>
                                                            <View style={{ backgroundColor: primaryColor, paddingVertical: 15 }}>
                                                                      {isLoading ? <View style={styles.loadingWrapper}>
                                                                                <ActivityIndicator animating color={"#fff"} />
                                                                                <Text style={[styles.submitBtnText, { marginLeft: 10 }]}>
                                                                                          Traitement...
                                                                                </Text>
                                                                      </View> :<Text style={styles.submitBtnText}>
                                                                                S'inscire
                                                                      </Text>}
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginVertical: 30 }}>
                                                  <Text style={styles.toRegisterText}>
                                                            Déjà un membre ?
                                                  </Text>
                                                  <TouchableOpacity onPress={() => navigation.navigate('LoginScreen' as never)}>
                                                            <Text style={styles.registerText} >
                                                                      Se connecter
                                                            </Text>
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
                    borderBottomWidth: 0.5,
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
          userImage: {
                    width: 80,
                    height: 80,
                    alignSelf: "center"
          },
          profilePhoto: {
                    width: "100%",
                    height: "100%",
                    borderRadius: 15
          }
})