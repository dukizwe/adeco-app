import React, { FC, memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { BackHandler, InputAccessoryView, ScrollView, StyleSheet, Text, TextInput, TextInputComponent, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import { Portal } from 'react-native-portalize'
import { primaryColor } from '../../../styles'
import { Feather } from '@expo/vector-icons';
import { useForm } from '../../../hooks/useForm'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeIn, BaseAnimationBuilder, FadeInDown, SlideInDown, SlideInUp, SlideOutUp, SlideInRight, SlideOutDown } from 'react-native-reanimated'
import { DataChanger, DebtFormInterface } from '../../../types/DebtFormInterface'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { queueListSelector } from '../../../store/selectors/contributionSelectors'

interface UserDebtInitial {
          [key: number]: DebtFormInterface
}
interface Props {
          /**
           * Une fonction qui va fermer le form
           */
          onClose: () => void,
          onSubmit: (montant: number, month: number, comment?: string) => void,
          data: DebtFormInterface,
          handleChange: (name: "amount" | "month" | "comment", value: string) => void
}


type Inputs = 'amount' | 'comment' | undefined
export default memo(function DebtForm({ onClose, onSubmit, data, handleChange }: Props): JSX.Element {
          const monthInputRef = useRef<TextInput>(null)
          const commentInputRef = useRef<TextInput>(null)
          const sendBtnOpacity = useSharedValue<number>(1)
          const queueList = useAppSelector(queueListSelector)

          const [isFocused, setIsFocused] = useState<Inputs>(undefined)
          
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

          const isValid = data.amount != ''
          useEffect(() => {
                    sendBtnOpacity.value = withTiming(isValid ? 1 : 0.5, {
                              duration: 200
                    })
          }, [isValid])
          const entering = () => {
                    'worklet';
                    const animations = {
                              opacity: withTiming(1, { duration: 150 }),
                    };
                    const initialValues = {
                              opacity: 0,
                    };
                    return {
                              initialValues,
                              animations,
                    };
          };
          const exiting = () => {
                    'worklet';
                    const animations = {
                              opacity: withTiming(0, { duration: 200 }),
                    };
                    const initialValues = {
                              opacity: 1,
                    };
                    return {
                              initialValues,
                              animations,
                    }
          }
          const getCumul = useCallback(() => {
                    if(!parseInt(data.amount)) {
                              return 0
                    }
                    return (parseInt(data.amount) * 5) / 100
          }, [data.amount])
          return (
                    <Portal>
                              <TouchableWithoutFeedback onPress={onClose}>
                                        <Animated.View style={styles.modalContainer} exiting={exiting}  >
                                                  <TouchableWithoutFeedback>
                                                            <Animated.View style={styles.formContent}>
                                                                      <ScrollView keyboardShouldPersistTaps="handled">
                                                                                <View style={styles.inputs}>
                                                                                          <View style={[styles.formControl, { marginRight: 5}]}>
                                                                                                    <Text style={styles.inputLabel}>Montant</Text>
                                                                                                    <TextInput
                                                                                                              keyboardType='number-pad'
                                                                                                              placeholder="Entrez le montant"
                                                                                                              autoFocus
                                                                                                              value={data.amount.toString()}
                                                                                                              onChangeText={n => {
                                                                                                                        handleChange('amount', n)
                                                                                                              }}
                                                                                                              returnKeyType="next"
                                                                                                              blurOnSubmit={false}
                                                                                                              onSubmitEditing={() => {
                                                                                                                        commentInputRef.current?.focus()
                                                                                                              }}
                                                                                                              onFocus={() => setIsFocused('amount')}
                                                                                                              style={[styles.input, isFocused == "amount" && { borderColor: primaryColor }]}
                                                                                                    />
                                                                                          </View>
                                                                                          <View style={[styles.formControl, { marginLeft: 5 }]}>
                                                                                                    <Text style={styles.inputLabel}>
                                                                                                              Cumul mensuel
                                                                                                    </Text>
                                                                                                    <TextInput
                                                                                                              keyboardType='number-pad'
                                                                                                              placeholder="Entrez le mois"
                                                                                                              ref={monthInputRef}
                                                                                                              value={`${getCumul().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF (3 mois)`}
                                                                                                              onChangeText={n => {
                                                                                                                        handleChange('month', n)
                                                                                                              }}
                                                                                                              returnKeyType="next"
                                                                                                              blurOnSubmit={false}
                                                                                                              onSubmitEditing={() => {
                                                                                                                        commentInputRef.current?.focus()
                                                                                                              }}
                                                                                                              editable={false}
                                                                                                              style={[styles.input ]}
                                                                                                    />
                                                                                          </View>
                                                                                          {/* <FormControl ml={2} flex={1}>
                                                                                                    <FormControl.Label style={{ marginBottom: 2 }} >Mois</FormControl.Label>
                                                                                                    <Input
                                                                                                              keyboardType='number-pad'
                                                                                                              placeholder="Entrez le mois"
                                                                                                              borderRadius={8}
                                                                                                              _focus={{
                                                                                                                        borderColor: primaryColor,
                                                                                                                        backgroundColor: '#fff'
                                                                                                              }}
                                                                                                              ref={monthInputRef}
                                                                                                              value={"3"}
                                                                                                              onChangeText={n => {
                                                                                                                        handleChange('month', n)
                                                                                                              }}
                                                                                                              returnKeyType="next"
                                                                                                              blurOnSubmit={false}
                                                                                                              onSubmitEditing={() => {
                                                                                                                        commentInputRef.current?.focus()
                                                                                                              }}
                                                                                                              isDisabled
                                                                                                    />
                                                                                          </FormControl> */}
                                                                                </View>
                                                                                <View style={styles.formFooter}>
                                                                                          <View style={[styles.formControl, { marginRight: 10 }]}>
                                                                                                    <Text style={styles.inputLabel}>Commentaire</Text>
                                                                                                    <TextInput
                                                                                                              placeholder="Ecrire un commentaire"
                                                                                                              multiline
                                                                                                              ref={commentInputRef}
                                                                                                              blurOnSubmit={false}
                                                                                                              value={data.comment}
                                                                                                              onChangeText={n => {
                                                                                                                        handleChange('comment', n)
                                                                                                              }}
                                                                                                              onFocus={() => setIsFocused('comment')}
                                                                                                              style={[styles.input, isFocused == "comment" && { borderColor: primaryColor }, { maxHeight: 100, height: 'auto', minHeight:  45 }]}
                                                                                                    />
                                                                                          </View>
                                                                                          <TouchableWithoutFeedback onPress={() => onSubmit(parseInt(data.amount, 10), parseInt(data.month), data.comment)} disabled={!isValid}>
                                                                                          <Animated.View style={[styles.sendBtn, opacityAnimatedstyles]}>
                                                                                                    <Feather name="save" size={24} color="#fff" />
                                                                                          </Animated.View>
                                                                                </TouchableWithoutFeedback>
                                                                                </View>
                                                                      </ScrollView>
                                                            </Animated.View>
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
          },
          input: {
                    borderColor: '#F1F1F1',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    height: 45,
                    fontSize: 12
          },
          formControl: {
                    flex: 1
          },
          inputLabel: {
                    color: '#777',
                    marginBottom: 5
          }
})