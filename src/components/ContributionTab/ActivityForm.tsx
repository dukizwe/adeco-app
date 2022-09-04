import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { Entypo, Feather, MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { primaryColor, smallGreenWhiteColor } from '../../styles'
import { FormControl, Input } from 'native-base'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
interface Props {
          formRef: React.RefObject<Modalize>,
          isOpen: boolean,
          setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
          loadingForm: boolean,
          setLoadingForm: React.Dispatch<React.SetStateAction<boolean>>,
}

interface DropdownProps {
          showActivityCategories: boolean
}

const ActivitiyCategoriesDropdown = ({ showActivityCategories }: DropdownProps) => {
          const dropdownTranslateY = useSharedValue<number>(0)

          const translateYAnimatedStyles = useAnimatedStyle(() => ({
                    transform: [{ translateY: dropdownTranslateY.value }]
          }))
          const entering = () => {
                    'worklet';
                    const animations = {
                              transform: [{ translateY: withTiming(5, { duration: 150 }) }]
                    };
                    const initialValues = {
                              transform: [{ translateY: 0 }]
                    };
                    return {
                              initialValues,
                              animations,
                    };
          };
          const exiting = () => {
                    'worklet';
                    const animations = {
                              transform: [{ translateY: withTiming(0, { duration: 150 }) }]
                    };
                    const initialValues = {
                              transform: [{ translateY: 5 }]
                    };
                    return {
                              initialValues,
                              animations,
                    };
          }
          return (
                    <Animated.View style={[styles.dropdownContainer]}>
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fff', false)}>
                                        <View style={styles.dropdownItem}>
                                                  <View style={styles.dropdownIconTitle}>
                                                            <Ionicons name="ios-fast-food-outline" size={24} color="#777" />
                                                            <Text style={styles.dropdownTitle}>Agape</Text>
                                                  </View>
                                                  <View style={styles.activityType}>
                                                            <Text style={[styles.activityTypeText, { fontSize: 12 }]}>débiter</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.separator} />
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fff', false)}>
                                        <View style={styles.dropdownItem}>
                                                  <View style={styles.dropdownIconTitle}>
                                                            <MaterialIcons name="local-hospital" size={24} color="#777" />
                                                            <Text style={styles.dropdownTitle}>Assistance</Text>
                                                  </View>
                                                  <View style={styles.activityType}>
                                                            <Text style={[styles.activityTypeText, { fontSize: 12 }]}>débiter</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.separator} />
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fff', false)}>
                                        <View style={styles.dropdownItem}>
                                                  <View style={styles.dropdownIconTitle}>
                                                            <MaterialIcons name="monetization-on" size={24} color="#777" />
                                                            <Text style={styles.dropdownTitle}>Don</Text>
                                                  </View>
                                                  <View style={styles.activityType}>
                                                            <Text style={[styles.activityTypeText, { fontSize: 12 }]}>débiter</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.separator} />
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fff', false)}>
                                        <View style={styles.dropdownItem}>
                                                  <View style={styles.dropdownIconTitle}>
                                                            <Ionicons name="ios-add-circle" size={24} color={primaryColor} />
                                                            <Text style={[styles.dropdownTitle, { color: primaryColor }]}>Nouvelle activité</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                    </Animated.View>
          )
}

export default function ActivityForm({ formRef, isOpen, setIsOpen, loadingForm, setLoadingForm }: Props) {
          const sendBtnOpacity = useSharedValue<number>(1)
          const commentInputRef = useRef<TextInput>(null)
          const [showActivityCategories, setShowActivityCategories] = useState<boolean>(false)

          const opacityAnimatedstyles = useAnimatedStyle(() => ({
                    opacity: sendBtnOpacity.value
          }))

          const toggleActivityCategories = useCallback(() => {
                    setShowActivityCategories(t => !t)
          }, [])
          return (
                    <Portal>
                              <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                        <Modalize
                                                  ref={formRef}
                                                  onClosed={() => {
                                                            setIsOpen(false)
                                                            setLoadingForm(true)
                                                  }}
                                                  adjustToContentHeight
                                                  handlePosition="inside"
                                                  modalStyle={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                                                  scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
                                        >
                                                  {loadingForm ? <ActivityIndicator
                                                            animating
                                                            size={"small"}
                                                            color='#777'
                                                            style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                                                  /> : <View style={styles.formContainer}>
                                                            {showActivityCategories && <ActivitiyCategoriesDropdown showActivityCategories={showActivityCategories} />}
                                                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#d6d6d6', false)} onPress={toggleActivityCategories}>
                                                                      <View style={styles.activityContainer}>
                                                                                <View style={styles.activity}>
                                                                                          <Text style={styles.activityLabel}>Pas d'activité</Text>
                                                                                          <Entypo name="chevron-small-down" size={24} color="#777" />
                                                                                </View>
                                                                                <View style={styles.activityType}>
                                                                                          <Text style={styles.activityTypeText}>débiter</Text>
                                                                                </View>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            <View style={styles.inputs}>
                                                                      <FormControl mr={2} flex={1}>
                                                                                <FormControl.Label style={{ marginBottom: 2, flexDirection: 'row', alignItems: 'center' }}>
                                                                                          <Feather name="calendar" size={20} color="#777" style={{ marginRight: 5 }} />
                                                                                          Date
                                                                                </FormControl.Label>
                                                                                <TouchableOpacity activeOpacity={0.5}>
                                                                                          <View style={styles.calendarOpener}>
                                                                                                    <Text style={styles.calendarValue}>26-08-2022 à 14h:00</Text>
                                                                                          </View>
                                                                                </TouchableOpacity>
                                                                      </FormControl>
                                                                      <FormControl ml={2} flex={1}>
                                                                                <FormControl.Label style={{ marginBottom: 2, flexDirection: 'row', alignItems: 'center' }}>
                                                                                          <MaterialIcons name="attach-money" size={20} color="#777" style={{ marginRight: 0 }} />
                                                                                          Montant
                                                                                </FormControl.Label>
                                                                                <Input
                                                                                          keyboardType='number-pad'
                                                                                          placeholder="Ecrire le montant"
                                                                                          borderRadius={8}
                                                                                          _focus={{
                                                                                                    borderColor: primaryColor,
                                                                                                    backgroundColor: '#fff'
                                                                                          }}
                                                                                          // ref={monthInputRef}
                                                                                          // value={debted && !isEditing ? debted.month.toString() : data.month.toString()}
                                                                                          // onChangeText={n => {
                                                                                          //           onChange('month', n)
                                                                                          //           if(debted && !isEditing) {
                                                                                          //                     setIsediting(true)
                                                                                          //           }
                                                                                          // }}
                                                                                          returnKeyType="next"
                                                                                          blurOnSubmit={false}
                                                                                          onSubmitEditing={() => {
                                                                                                    commentInputRef.current?.focus()
                                                                                          }}
                                                                                />
                                                                      </FormControl>
                                                            </View>
                                                            <View style={styles.formFooter}>
                                                                      <FormControl flex={1}>
                                                                                <FormControl.Label style={{ marginBottom: 2, flexDirection: 'row', alignItems: 'center' }}>
                                                                                          <Octicons name="comment" size={20} color="#777" style={{ marginRight: 5, marginBottom: -5 }} />
                                                                                          Commentaire
                                                                                </FormControl.Label>
                                                                                <Input
                                                                                          placeholder="Ecrire un commentaire"
                                                                                          borderRadius={8}
                                                                                          multiline
                                                                                          mr={5}
                                                                                          _focus={{
                                                                                                    borderColor: primaryColor,
                                                                                                    backgroundColor: '#fff'
                                                                                          }}
                                                                                          ref={commentInputRef}
                                                                                          // blurOnSubmit={false}
                                                                                          // value={debted && !isEditing ? debted.comment : data.comment}
                                                                                          // onChangeText={n => {
                                                                                          //           onChange('comment', n)
                                                                                          //           if(debted && !isEditing) {
                                                                                          //                     setIsediting(true)
                                                                                          //           }
                                                                                          // }}
                                                                                          maxHeight={100}
                                                                                />
                                                                      </FormControl>
                                                                      <TouchableWithoutFeedback>
                                                                                <Animated.View style={[styles.sendBtn, opacityAnimatedstyles]}>
                                                                                          <Feather name="save" size={24} color="#fff" />
                                                                                </Animated.View>
                                                                      </TouchableWithoutFeedback>
                                                            </View>
                                                  </View>}
                                        </Modalize>
                              </GestureHandlerRootView>
                    </Portal>
          )
}

const styles = StyleSheet.create({
          formContainer: {
                    paddingVertical: 30
          },
          activityContainer: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                    borderRadius: 5,
                    elevation: 10,
                    shadowColor: '#F4F4F4',
                    paddingHorizontal: 15,
          },
          activity: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          activityLabel: {
                    color: '#777',
          },
          activityType: {
                    backgroundColor: smallGreenWhiteColor,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10
          },
          activityTypeText: {
                    color: '#1e294f',
                    fontWeight: 'bold',
                    opacity: 0.7
          },
          calendarOpener: {
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 8,
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    overflow: 'hidden'
          },
          calendarValue: {
                    color: '#777',
                    fontSize: 12
          },
          inputs: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15
          },

          formFooter: {
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingHorizontal: 15
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

          dropdownContainer: {
                    borderRadius: 10,
                    backgroundColor: '#EFEFEF',
                    elevation: 10,
                    shadowColor: '#F4F4F4',
                    width: 300,
                    overflow: 'hidden',
                    zIndex: 20000,
                    bottom: '100%',
                    position: 'absolute',
                    
          },
          dropdownItem: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10
          },
          dropdownIconTitle: {
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          dropdownTitle: {
                    color: '#777',
                    marginLeft: 10,
                    fontWeight: 'bold',
                    fontSize: 13
          },
          separator: {
                    height: 1,
                    width: '100%',
                    backgroundColor: '#ddd',
                    paddingHorizontal: 20
          }
})