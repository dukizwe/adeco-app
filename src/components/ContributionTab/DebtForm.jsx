import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import React, { memo, useEffect, useRef } from 'react'
import { BackHandler, ScrollView, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import { Portal } from 'react-native-portalize'
import { primaryColor } from '../../styles'
import { Feather } from '@expo/vector-icons';
import { useForm } from '../../hooks/useForm'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeIn } from 'react-native-reanimated'

export default memo(function DebtForm({ onClose }) {
          const monthInputRef = useRef(null)
          const commentInputRef = useRef(null)
          const sendBtnOpacity = useSharedValue(1)

          const [data, onChange] = useForm({
                    amount: '',
                    month: '',
                    comment: ''
          })
          useEffect(() => {
                    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                              onClose()
                              return true
                    })
                    return () => {
                              backHandler.remove()
                    }
          }, [])

          const opacityAnimatedstyles = useAnimatedStyle(() => ({
                    opacity: sendBtnOpacity.value
          }))

          const isValid = data.amount != '' && data.month != '' && data.comment != ''
          useEffect(() => {
                    sendBtnOpacity.value = withTiming(isValid ? 1 : 0.5, {
                              duration: 200
                    })
          }, [isValid])
          const entering = (targetValues) => {
                    'worklet';
                    const animations = {
                              opacity: withTiming(1, { duration: 2000 }),
                    };
                    const initialValues = {
                              opacity: 0,
                    };
                    return {
                              initialValues,
                              animations,
                    };
          };
          const exiting = (values) => {
                    'worklet';
                    const animations = {
                              opacity: withTiming(0, { duration: 2000 }),
                    };
                    const initialValues = {
                              opacity: 1,
                    };
                    return {
                              initialValues,
                              animations,
                    }
          }
          return (
                    <Portal>
                              <TouchableWithoutFeedback onPress={onClose} entering={FadeIn}>
                                        <Animated.View style={styles.modalContainer} entering={FadeIn}  >
                                                  <TouchableWithoutFeedback>
                                                            <View style={styles.formContent}>
                                                                      <ScrollView keyboardShouldPersistTaps="handled">
                                                                                <View style={styles.inputs}>
                                                                                          <FormControl mr={2} flex={1}>
                                                                                                    <FormControl.Label style={{ marginBottom: 2 }}>Montant</FormControl.Label>
                                                                                                    <Input
                                                                                                              keyboardType='number-pad'
                                                                                                              placeholder="Entrez le montant"
                                                                                                              borderRadius={8}
                                                                                                              autoFocus
                                                                                                              value={data.amount}
                                                                                                              onChangeText={n => onChange('amount', n)}
                                                                                                              _focus={{
                                                                                                                        borderColor: primaryColor
                                                                                                              }}
                                                                                                              returnKeyType="next"
                                                                                                              blurOnSubmit={false}
                                                                                                              onSubmitEditing={() => {
                                                                                                                        monthInputRef.current.focus()
                                                                                                              }}
                                                                                                    />
                                                                                                    {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                                                                    Try different from previous passwords.
                                                                                          </FormControl.ErrorMessage> */}
                                                                                          </FormControl>
                                                                                          <FormControl ml={2} flex={1}>
                                                                                                    <FormControl.Label style={{ marginBottom: 2 }} >Mois</FormControl.Label>
                                                                                                    <Input
                                                                                                              keyboardType='number-pad'
                                                                                                              placeholder="Entrez le mois"
                                                                                                              borderRadius={8}
                                                                                                              _focus={{
                                                                                                                        borderColor: primaryColor
                                                                                                              }}
                                                                                                              ref={monthInputRef}
                                                                                                              value={data.month}
                                                                                                              onChangeText={n => onChange('month', n)}
                                                                                                              returnKeyType="next"
                                                                                                              blurOnSubmit={false}
                                                                                                              onSubmitEditing={() => {
                                                                                                                        commentInputRef.current.focus()
                                                                                                              }}
                                                                                                    />
                                                                                          </FormControl>
                                                                                </View>
                                                                                <View style={styles.formFooter}>
                                                                                          <FormControl flex={1}>
                                                                                                    <FormControl.Label style={{ marginBottom: 2 }} >Commentaire</FormControl.Label>
                                                                                                    <Input
                                                                                                              placeholder="Ecrire un commentaire"
                                                                                                              borderRadius={8}
                                                                                                              multiline
                                                                                                              mr={5}
                                                                                                              _focus={{
                                                                                                                        borderColor: primaryColor
                                                                                                              }}
                                                                                                              ref={commentInputRef}
                                                                                                              blurOnSubmit={false}
                                                                                                              value={data.comment}
                                                                                                              onChangeText={n => onChange('comment', n)}
                                                                                                              maxHeight={100}
                                                                                                    />
                                                                                          </FormControl>
                                                                                          <TouchableWithoutFeedback onPress={() => console.log('hy')} disabled={!isValid}>
                                                                                                    <Animated.View style={[styles.sendBtn, opacityAnimatedstyles]}>
                                                                                                              <Feather name="save" size={24} color="#fff" />
                                                                                                    </Animated.View>
                                                                                          </TouchableWithoutFeedback>
                                                                                </View>
                                                                      </ScrollView>
                                                            </View>
                                                  </TouchableWithoutFeedback>
                                        </Animated.View>
                              </TouchableWithoutFeedback>
                    </Portal>
          )
})

const styles = StyleSheet.create({
          modalContainer: {
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.8)'
          },
          formContent: {
                    backgroundColor: '#fff',
                    position: 'absolute',
                    bottom: 0,
                    padding: 20,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    width: '100%',
          },
          inputs: {
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          input: {
                    borderColor: '#777',
                    borderWidth: 2,
                    borderRadius: 5,
                    flex: 1,
                    padding: 5
          },
          formFooter: {
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'flex-end'
          },
          sendBtn: {
                    backgroundColor: primaryColor,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.9
          }
})