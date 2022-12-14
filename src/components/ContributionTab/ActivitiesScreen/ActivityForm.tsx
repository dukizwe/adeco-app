import React, { useCallback, useEffect, useRef, useState, PropsWithChildren, FC } from 'react'
import { ActivityIndicator, Keyboard, Platform, StyleSheet, Text, TextInput, TextStyle, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { Entypo, Feather, MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { primaryColor, smallGreenWhiteColor } from '../../../styles'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, useHandler, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { ActivityCategoryInterface } from '../../../types/ActivityCategoryInterface'
import { Activity } from '../../../types/Activity'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { queueListSelector } from '../../../store/selectors/contributionSelectors'
import { useDispatch } from 'react-redux'
import { appendActivityAction } from '../../../store/actions/contributionActions'
import { COLORS } from '../../../styles/COLORS'
interface Props {
          formRef: React.RefObject<Modalize>,
          isOpen: boolean,
          setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
          loadingForm: boolean,
          setLoadingForm: React.Dispatch<React.SetStateAction<boolean>>,
          categories: ActivityCategoryInterface[]
}

/**
 * Render icon dymanically
 */
export const ActivitiesIcons = {
          Ionicons: (name: any, style?: TextStyle) => <Ionicons name={name} size={24} color="#777" style={style} />,
          MaterialIcons: (name: any, style?: TextStyle) => <MaterialIcons name={name} size={24} color="#777" style={style} />
}

type Inputs = 'activity' | 'amount' | 'comment' | undefined

interface NewActivity {
          name: string,
          category: 'out' | 'in' | null
}
export default function ActivityForm({ formRef, isOpen, setIsOpen, loadingForm, setLoadingForm, categories }: Props) {
          const sendBtnOpacity = useSharedValue<number>(1)
          const dropdownCaretDeg = useSharedValue<number>(0)
          const amountRef = useRef<TextInput>(null)
          const commentInputRef = useRef<TextInput>(null)
          const [showActivityCategories, setShowActivityCategories] = useState<boolean>(false)
          const [showCalendar, setShowCalendar] = useState<boolean>(false)

          const [peddingActivty, setPeddingActivity] = useState<Activity>({
                    category: null,
                    date: new Date(),
                    amount: "",
                    comment: "",
                    isNew: false
          })

          const queueList = useAppSelector(queueListSelector)
          const [isFocused, setIsFocused] = useState<Inputs>(undefined)

          const [isNewActivity, setIsNewActivity] = useState(false)

          const [newActivity, setNewActivity] = useState<NewActivity>({
                    name: "",
                    category: null
          })

          const dispatch = useDispatch()

          const opacityAnimatedstyles = useAnimatedStyle(() => ({
                    opacity: sendBtnOpacity.value
          }))
          const dropdownTranslateY = useSharedValue<number>(30)

          const translateYAnimatedStyles = useAnimatedStyle(() => ({
                    transform: [{ translateY: dropdownTranslateY.value }]
          }))
          // const caretAnimation = useDerivedValue(() => interpolate(dropdownCaretDeg.value, [0, 360], [0, 360]))
          const dropdownCaretAnimatedStyles = useAnimatedStyle(() => ({
                    transform: [{ rotate: `${dropdownCaretDeg.value}deg` }]
          }))

          const toggleActivityCategories = useCallback(() => {
                    setShowActivityCategories(t => !t)
          }, [])

          useEffect(() => {
                    if (showActivityCategories) {
                              dropdownTranslateY.value = withSpring(0)
                              dropdownCaretDeg.value = withSpring(-180)
                    } else {
                              dropdownTranslateY.value = withSpring(30)
                              dropdownCaretDeg.value = withSpring(0)
                    }
          }, [showActivityCategories])

          const onNewActivityPress = () => {
                    setShowActivityCategories(false)
                    setIsNewActivity(true)
          }

          const onCategoryPress = (category: ActivityCategoryInterface) => {
                    setPeddingActivity(l => ({
                              ...l,
                              category
                    }))
                    setShowActivityCategories(false)
          }

          const onChangeFromTime = (event: DateTimePickerEvent, time?: Date) => {
                    setShowCalendar(Platform.OS === "ios");
                    setPeddingActivity(p => ({
                              ...p,
                              date: time || new Date()
                    }))
          }

          const ActivitiyCategoriesDropdown: React.ReactNode = (
                    showActivityCategories ? <Animated.View style={[styles.dropdownContainer, translateYAnimatedStyles]}>
                              {categories.map(category => {
                                        const iconType = category.iconType
                                        return (
                                                  <View key={category._id}>
                                                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#ddd', false)} onPress={() => onCategoryPress(category)}>
                                                                      <View style={styles.dropdownItem}>
                                                                                <View style={styles.dropdownIconTitle}>
                                                                                          {iconType ? ActivitiesIcons[iconType](category.iconName) : ActivitiesIcons.MaterialIcons("monetization-on")}
                                                                                          <Text style={styles.dropdownTitle}>{category.name}</Text>
                                                                                </View>
                                                                                <View style={styles.activityType}>
                                                                                          {category.type == "out" ? <Text style={[styles.activityTypeText, { fontSize: 12, color: '#D2001A' }]}>- débiter</Text> :
                                                                                                    <Text style={[styles.activityTypeText, { fontSize: 12, color: '#367E18' }]}>+ créditer</Text>}
                                                                                </View>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            <View style={styles.separator} />
                                                  </View>
                                        )
                              })}
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fff', false)} onPress={onNewActivityPress}>
                                        <View style={styles.dropdownItem}>
                                                  <View style={styles.dropdownIconTitle}>
                                                            <Ionicons name="ios-add-circle" size={24} color={primaryColor} />
                                                            <Text style={[styles.dropdownTitle, { color: primaryColor }]}>Nouvelle activité</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                    </Animated.View> : undefined
          )

          const onSave = () => {
                    const id = new Date()
                    dispatch(appendActivityAction({ ...peddingActivty, date: peddingActivty.date.toString(), id: id.toString() }))
                    formRef.current?.close()
                    setPeddingActivity({
                              category: null,
                              date: new Date(),
                              amount: "",
                              comment: ""
                    })
          }

          const isValid = peddingActivty.category && parseInt(peddingActivty.amount) > 0 && peddingActivty.date ? true : false
          useEffect(() => {
                    sendBtnOpacity.value = withTiming(isValid ? 1 : 0.5, {
                              duration: 200
                    })
          }, [isValid])

          return (
                    <>
                              <Portal>
                                        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                                  <Modalize
                                                            ref={formRef}
                                                            onClose={() => {
                                                                      setShowActivityCategories(false)
                                                                      Keyboard.dismiss()
                                                            }}
                                                            onClosed={() => {
                                                                      setIsOpen(false)
                                                                      setLoadingForm(true)
                                                            }}
                                                            adjustToContentHeight
                                                            handlePosition="inside"
                                                            modalStyle={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                                                            FloatingComponent={ActivitiyCategoriesDropdown}
                                                            scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
                                                  >
                                                            {loadingForm ? <ActivityIndicator
                                                                      animating
                                                                      size={"small"}
                                                                      color='#777'
                                                                      style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                                                            /> : <View style={styles.formContainer}>
                                                                      {/* {showActivityCategories && <ActivitiyCategoriesDropdown showActivityCategories={showActivityCategories} />} */}
                                                                      {isNewActivity ? <View style={styles.newActivityForm}>
                                                                                <View style={[styles.formControl, { marginRight: 5 }]}>
                                                                                          <TextInput
                                                                                                    placeholder="Activité"
                                                                                                    value={peddingActivty.category?.name}
                                                                                                    onChangeText={newName => {
                                                                                                              setPeddingActivity(t => {
                                                                                                                        const newCategory: ActivityCategoryInterface = t.category ? { ...t.category, name: newName } : {
                                                                                                                                  _id: new Date().toString(),
                                                                                                                                  name: newName,
                                                                                                                                  type: "in",
                                                                                                                                  iconName: "monetization-on",
                                                                                                                                  iconType: "MaterialIcons"
                                                                                                                        }
                                                                                                                        return {
                                                                                                                                  ...t,
                                                                                                                                  category: newCategory,
                                                                                                                                  isNew: true
                                                                                                                        }
                                                                                                              })
                                                                                                    }}
                                                                                                    returnKeyType="next"
                                                                                                    blurOnSubmit={false}
                                                                                                    onSubmitEditing={() => {
                                                                                                              amountRef.current?.focus()
                                                                                                    }}
                                                                                                    onFocus={() => setIsFocused('activity')}
                                                                                                    style={[styles.input, isFocused == "activity" && { borderColor: primaryColor }]}
                                                                                          />
                                                                                </View>
                                                                                <View style={styles.newActivityCategories}>
                                                                                          <TouchableOpacity style={[styles.activityType, { backgroundColor: undefined }, peddingActivty.category?.type == 'out' && { backgroundColor: COLORS.smallGreenWhiteColor }]} onPress={() => {
                                                                                                    setPeddingActivity(t => {
                                                                                                              const newCategory: ActivityCategoryInterface = t.category ? { ...t.category, type: "out" } : {
                                                                                                                        _id: new Date().toString(),
                                                                                                                        name: "",
                                                                                                                        type: "out",
                                                                                                                        iconName: "monetization-on",
                                                                                                                        iconType: "MaterialIcons"
                                                                                                              }
                                                                                                              return {
                                                                                                                        ...t,
                                                                                                                        category: newCategory,
                                                                                                                        isNew: true
                                                                                                              }
                                                                                                    })
                                                                                          }}>
                                                                                                    <Text style={[styles.activityTypeText, { fontSize: 12, color: '#D2001A' }]}>- débiter</Text>
                                                                                          </TouchableOpacity>
                                                                                          <TouchableOpacity style={[styles.activityType, { marginLeft: 5, backgroundColor: undefined }, peddingActivty.category?.type == 'in' && { backgroundColor: COLORS.smallGreenWhiteColor }]} onPress={() => {
                                                                                                    setPeddingActivity(t => {
                                                                                                              const newCategory: ActivityCategoryInterface = t.category ? { ...t.category, type: "in" } : {
                                                                                                                        _id: new Date().toString(),
                                                                                                                        name: "",
                                                                                                                        type: "in",
                                                                                                                        iconName: "monetization-on",
                                                                                                                        iconType: "MaterialIcons"
                                                                                                              }
                                                                                                              return {
                                                                                                                        ...t,
                                                                                                                        category: newCategory,
                                                                                                                        isNew: true
                                                                                                              }
                                                                                                    })
                                                                                          }}>
                                                                                                    <Text style={[styles.activityTypeText, { fontSize: 12, color: '#367E18' }]}>+ créditer</Text>
                                                                                          </TouchableOpacity>
                                                                                </View>
                                                                      </View> : <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#d6d6d6', false)} onPress={toggleActivityCategories}>
                                                                                <View style={[styles.activityContainer, showActivityCategories && { backgroundColor: '#F1F1F1' }]}>
                                                                                          <View style={styles.activity}>
                                                                                                    {peddingActivty.category ?
                                                                                                              <View style={[{ marginBottom: 0, flexDirection: 'row', alignItems: 'center' }]}>
                                                                                                                        {peddingActivty.category.iconType ? ActivitiesIcons[peddingActivty.category.iconType](peddingActivty.category.iconName, { marginRight: 5 }) : ActivitiesIcons.MaterialIcons("monetization-on")}
                                                                                                                        <Text style={styles.activityLabel}>{peddingActivty.category.name}</Text>
                                                                                                              </View> :
                                                                                                              <Text style={styles.activityLabel}>Pas d'activité</Text>}
                                                                                                    <Animated.View style={[dropdownCaretAnimatedStyles]}>
                                                                                                              <Entypo name="chevron-small-down" size={24} color="#777" />
                                                                                                    </Animated.View>
                                                                                          </View>
                                                                                          {peddingActivty.category ? <View style={styles.activityType}>
                                                                                                    {peddingActivty.category.type == "out" ? <Text style={[styles.activityTypeText, { fontSize: 12, color: '#D2001A' }]}>- débiter</Text> :
                                                                                                              <Text style={[styles.activityTypeText, { fontSize: 12, color: '#367E18' }]}>+ créditer</Text>}
                                                                                          </View> : null}
                                                                                </View>
                                                                      </TouchableNativeFeedback>}
                                                                      <View style={styles.inputs}>
                                                                                <View style={[styles.formControl, { marginRight: 5 }]}>
                                                                                          <Text style={[styles.inputLabel, { flexDirection: 'row', alignItems: 'center' }]}>
                                                                                                    Date
                                                                                          </Text>
                                                                                          <TouchableOpacity activeOpacity={0.5} onPress={() => setShowCalendar(true)}>
                                                                                                    <View style={styles.calendarOpener}>
                                                                                                              <Text style={styles.calendarValue}>
                                                                                                                        {moment(peddingActivty.date).format("DD-MM-YYYY")}
                                                                                                              </Text>
                                                                                                    </View>
                                                                                          </TouchableOpacity>
                                                                                </View>
                                                                                <View style={[styles.formControl, { marginLeft: 5 }]}>
                                                                                          <Text style={styles.inputLabel}>Montant</Text>
                                                                                          <TextInput
                                                                                                    keyboardType='number-pad'
                                                                                                    placeholder="Ecrire le montant"
                                                                                                    value={peddingActivty.amount}
                                                                                                    onChangeText={newAmount => {
                                                                                                              setPeddingActivity(t => ({
                                                                                                                        ...t,
                                                                                                                        amount: newAmount
                                                                                                              }))
                                                                                                    }}
                                                                                                    returnKeyType="next"
                                                                                                    blurOnSubmit={false}
                                                                                                    onSubmitEditing={() => {
                                                                                                              commentInputRef.current?.focus()
                                                                                                    }}
                                                                                                    onFocus={() => setIsFocused('amount')}
                                                                                                    style={[styles.input, isFocused == "amount" && { borderColor: primaryColor }]}
                                                                                                    ref={amountRef}
                                                                                          />
                                                                                </View>
                                                                      </View>
                                                                      <View style={styles.formFooter}>
                                                                                <View style={[styles.formControl, { marginRight: 5 }]}>
                                                                                          <Text style={styles.inputLabel}>Commentaire</Text>
                                                                                          <TextInput
                                                                                                    placeholder="Ecrire un commentaire"
                                                                                                    multiline
                                                                                                    ref={commentInputRef}
                                                                                                    blurOnSubmit={false}
                                                                                                    value={peddingActivty.comment}
                                                                                                    onChangeText={newComment => {
                                                                                                              setPeddingActivity(l => ({
                                                                                                                        ...l,
                                                                                                                        comment: newComment
                                                                                                              }))
                                                                                                    }}
                                                                                                    onFocus={() => setIsFocused('comment')}
                                                                                                    style={[styles.input, isFocused == "comment" && { borderColor: primaryColor }, { maxHeight: 100, height: 'auto', minHeight: 45 }]}
                                                                                          />
                                                                                </View>
                                                                                <TouchableWithoutFeedback disabled={!isValid} onPress={onSave}>
                                                                                          <Animated.View style={[styles.sendBtn, opacityAnimatedstyles]}>
                                                                                                    <Feather name="save" size={24} color="#fff" />
                                                                                          </Animated.View>
                                                                                </TouchableWithoutFeedback>
                                                                      </View>
                                                            </View>}
                                                  </Modalize>
                                        </GestureHandlerRootView>
                              </Portal>
                              {showCalendar && (
                                        <DateTimePicker
                                                  testID="dateTimePicker"
                                                  value={peddingActivty.date ? new Date(peddingActivty.date) : new Date()}
                                                  mode='date'
                                                  is24Hour={true}
                                                  display="default"
                                                  onChange={onChangeFromTime}
                                                  maximumDate={new Date()}
                                        />
                              )}
                    </>
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
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    minWidth: 90,
                    backgroundColor: COLORS.smallGreenWhiteColor
          },
          activityTypeText: {
                    color: '#1e294f',
                    // fontWeight: 'bold',
                    opacity: 0.7,
                    textAlign: 'center'
          },
          calendarOpener: {
                    borderWidth: 1,
                    borderColor: '#F1F1F1',
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    overflow: 'hidden',
                    height: 45
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
                    marginTop: 10,
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
                    backgroundColor: '#FFF',
                    elevation: 10,
                    shadowColor: '#ddd',
                    borderColor: '#ddd',
                    width: '85%',
                    overflow: 'hidden',
                    bottom: 250,
                    position: 'absolute',
                    marginHorizontal: 20,
                    zIndex: 2,
                    alignSelf: 'center'
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
                    backgroundColor: '#F1F1F1',
                    paddingHorizontal: 20
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
          },
          newActivityForm: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    marginBottom: 5
          },
          newActivityCategories: {
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 5
          }
})