import React, { FC, memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { BackHandler, Image, InputAccessoryView, ScrollView, StyleSheet, Text, TextInput, TextInputComponent, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native'
import { Portal } from 'react-native-portalize'
import { Feather } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../../styles/COLORS';
import { ContributorInterface } from '../../../interfaces/ContributorInterface';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { queueListSelector } from '../../../store/selectors/contributionSelectors';
import moment from 'moment';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { PastDebtInterface } from '../../../types/ContributionContextInterface';
import { appendPastDebtAction } from '../../../store/actions/contributionActions';

interface Props {
          pastDebtUser: ContributorInterface,
          onClose: () => void,
}


export default memo(function PastDebtForm({ pastDebtUser, onClose }: Props): JSX.Element {
          const monthInputRef = useRef<TextInput>(null)
          const commentInputRef = useRef<TextInput>(null)
          const sendBtnOpacity = useSharedValue<number>(1)

          const queueList = useAppSelector(queueListSelector)
          const dispatch = useAppDispatch()

          const [amount, setAmount] = useState('')
          const [comment, setComment] = useState('')

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

          const isValid = parseInt(amount) > 0

          const onSubmit = useCallback(() => {
                    const newPastDebt: PastDebtInterface = {
                              _id: pastDebtUser._id,
                              amount: parseInt(amount),
                              comment,
                              date: queueList.date || new Date().toString()
                    }
                    dispatch(appendPastDebtAction(newPastDebt))
                    onClose()
          }, [pastDebtUser, amount, comment, queueList])

          const getCumul = useCallback(() => {
                    if(!parseInt(amount)) {
                              return 0
                    }
                    return (parseInt(amount) * 5) / 100
          }, [amount])

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
          return (
                    <Portal>
                              <TouchableWithoutFeedback onPress={onClose}>
                                        <Animated.View style={styles.modalContainer} exiting={exiting}  >
                                                  <TouchableWithoutFeedback>
                                                            <Animated.View style={styles.formContent}>
                                                                      <ScrollView keyboardShouldPersistTaps="handled">
                                                                                <View style={styles.header}>
                                                                                          <View style={styles.userInfo}>
                                                                                                    <View style={styles.userImage}>
                                                                                                              <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={require('../../../../assets/girl.jpg')} />
                                                                                                    </View>
                                                                                                    <Text style={styles.title}>
                                                                                                              {pastDebtUser.firstName} {pastDebtUser.lastName}
                                                                                                    </Text>
                                                                                          </View>
                                                                                          <Text style={styles.date}>
                                                                                                    {queueList.date ? moment(new Date(queueList.date)).format("DD-MM-YYYY") : moment(new Date()).format("DD-MM-YYYY")}
                                                                                          </Text>
                                                                                </View>
                                                                                <View style={styles.inputs}>
                                                                                          <View style={[styles.formControl, { marginRight: 5 }]}>
                                                                                                    <Text style={styles.formLabel}>
                                                                                                              Montant
                                                                                                    </Text>
                                                                                                    <TextInput
                                                                                                              keyboardType='number-pad'
                                                                                                              placeholder="Entrez le montant"
                                                                                                              autoFocus
                                                                                                              value={amount}
                                                                                                              onChangeText={n => {
                                                                                                                        setAmount(n)
                                                                                                              }}
                                                                                                              style={styles.textInput}
                                                                                                              returnKeyType="next"
                                                                                                              blurOnSubmit={false}
                                                                                                              onSubmitEditing={() => {
                                                                                                                        commentInputRef.current?.focus()
                                                                                                              }}
                                                                                                    />
                                                                                          </View>
                                                                                          <View style={[styles.formControl, { marginLeft: 5, opacity: 0.8 }]}>
                                                                                                    <Text style={styles.formLabel}>
                                                                                                              Cumul mensuel
                                                                                                    </Text>
                                                                                                    <TextInput
                                                                                                              keyboardType='number-pad'
                                                                                                              placeholder="Entrez le mois"
                                                                                                              style={styles.textInput}
                                                                                                              ref={monthInputRef}
                                                                                                              value={`${getCumul().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF (3 mois)`}
                                                                                                              onChangeText={n => {
                                                                                                                        // handleChange('month', n)
                                                                                                              }}
                                                                                                              returnKeyType="next"
                                                                                                              blurOnSubmit={false}
                                                                                                              onSubmitEditing={() => {
                                                                                                                        commentInputRef.current?.focus()
                                                                                                              }}
                                                                                                              editable={false}
                                                                                                    />
                                                                                          </View>
                                                                                </View>
                                                                                <View style={styles.formFooter}>
                                                                                          <View style={[styles.formControl, { marginTop: 5, marginBottom: 1 }]}>
                                                                                                    <Text style={styles.formLabel}>
                                                                                                              Commentaire
                                                                                                    </Text>
                                                                                                    <TextInput
                                                                                                              placeholder="Ecrire un commentaire"
                                                                                                              multiline
                                                                                                              style={[styles.textInput, { marginRight: 5, maxHeight: 100 }]}
                                                                                                              ref={commentInputRef}
                                                                                                              blurOnSubmit={false}
                                                                                                              value={comment}
                                                                                                              onChangeText={n => {
                                                                                                                        setComment(n)
                                                                                                              }}
                                                                                                    />
                                                                                          </View>
                                                                                          <TouchableWithoutFeedback onPress={onSubmit} disabled={!isValid}>
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
          header: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderBottomColor: '#F1F1F1',
                    paddingBottom: 10
          },
          userInfo: {
                    flexDirection: "row",
                    alignItems: "center",
          },
          date: {
                    fontSize: 12,
                    color: '#777'
          },
          userImage: {
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    alignSelf: "center"
          },
          title: {
                    color: '#000',
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    textAlign: "center",
                    opacity: 0.6
          },
          inputs: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5
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
                    backgroundColor: COLORS.primary,
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.9
          },
          formControl: {
                    flex: 1
          },
          formLabel: {
                    color: '#333',
                    marginBottom: 3
          },
          textInput: {
                    borderColor: '#aaaa',
                    borderWidth: 0.5,
                    borderRadius: 5,
                    padding: 10
          }
})