import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Modal, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, useWindowDimensions, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Ionicons } from '@expo/vector-icons';
import { smallGreenWhiteColor } from "../../styles";
import ActivityForm from "../../components/ContributionTab/ActivityForm";
import { gestureHandlerRootHOC, GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig, runOnJS } from "react-native-reanimated";
import { Portal } from "@gorhom/portal";
import { Modalize } from 'react-native-modalize';
import { useSelector } from "react-redux";
import { queueActivitiesSelector } from "../../store/selectors/contributionSelectors";
import Activity from "../../components/Activities/Activity";
import ActivitiesScreenHeader from "../../components/ContributionTab/ActivitiesScreenHeader";
import { Activity as ActivityInterface } from "../../types/Activity";
import { ActivityCategoryInterface } from "../../types/ActivityCategoryInterface";
import fetchApi from "../../utils/fetchApi";

export default function AcitivitiesScreen() {
          const { width, height } = useWindowDimensions()
          const top = useSharedValue(height)
          const formRef = useRef<Modalize>(null);
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const [isInSelect, setIsInSelect] = useState<boolean>(false)
          const [selectedActivites, setSelectedActivities] = useState<ActivityInterface[]>([])

          const [categories, setCategories] = useState<ActivityCategoryInterface[]>([])

          const activities = useSelector(queueActivitiesSelector)

          const handleRemove = () => {
                    const newActivities = activities.filter((activity) => selectedActivites.filter(selActivity => activity.category?._id != selActivity.category?._id))
                    setSelectedActivities(newActivities)
          }

          const onLongPress = (activity: ActivityInterface) => {
                    if(isInSelect) return false
                    setIsInSelect(true)
                    setSelectedActivities(t => [...t, activity])
          }

          const isSelected = (index: number) => {
                    return selectedActivites.find((t, i) => i == index) ? true : false
          }

          const onOpen = () => {
                    setIsOpen(true)
                    formRef.current?.open();
          };

          const onCloseBottomSheet = (bool: boolean) => {
                    setIsOpen(bool)
          }

          // variables
          const snapPoints = useMemo(() => ['25%', '50%'], []);

          // callbacks
          const handleSheetChanges = useCallback((index: number) => {
                    console.log('handleSheetChanges', index);
          }, []);

          const SPRING_CONFIG: WithSpringConfig = {
                    damping: 80,
                    overshootClamping: true,
                    restDisplacementThreshold: 0.1,
                    restSpeedThreshold: 0.1,
                    stiffness: 500
          }


          const animatedTopStyles = useAnimatedStyle(() => ({
                    top: withSpring(top.value, SPRING_CONFIG)
          }))
          const gestureHandler = useAnimatedGestureHandler({
                    onStart(_, context: { startTop: number }) {
                              context.startTop = top.value
                    },
                    onActive(event, context) {
                              top.value = context.startTop + event.translationY
                    },
                    onEnd(event) {
                              if (top.value > height / 2 + 150) {
                                        runOnJS(onCloseBottomSheet)(false)
                                        top.value = height
                              } else {
                                        top.value = height / 2
                              }
                    }
          })
          
          useEffect(() => {
                    if(isOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
          }, [isOpen])

          useEffect(() => {
                    (async() => {
                              const res = await fetchApi('/activities/categories')
                              const cats: ActivityCategoryInterface[] = res.data
                              setCategories(cats)
                    })()
          }, [])
          return (
                    <>
                              <ActivityForm formRef={formRef} isOpen={isOpen} setIsOpen={setIsOpen} loadingForm={loadingForm} setLoadingForm={setLoadingForm} categories={categories} />
                              <View style={styles.container}>
                                        {activities.length == 0 ? <View style={styles.content}>
                                                  <Text style={styles.title}>Activités</Text>
                                                  <Image source={require('../../../assets/images/note_list_2.png')} style={styles.emptyImageFeedBack} />
                                                  <Text style={styles.emptyTextFeedback}>
                                                            Cliquer sur le bouton <Ionicons name="add-circle-sharp" size={24} color={smallGreenWhiteColor} /> pour ajouter une activité
                                                  </Text>
                                        </View> :
                                                  <View style={styles.activitiesList}>
                                                            <ActivitiesScreenHeader isInSelect={isInSelect} handleRemove={handleRemove} />
                                                            <FlatList
                                                                      data={activities}
                                                                      renderItem={({item: activity, index}) => {
                                                                                return (
                                                                                          <Activity
                                                                                                    activity={activity}
                                                                                                    onLongPress={onLongPress}
                                                                                                    index={index}
                                                                                                    isSelected={isSelected(index)}
                                                                                                    isInSelect={isInSelect}
                                                                                                    setIsInSelect={setIsInSelect}
                                                                                                    selectedActivites={selectedActivites}
                                                                                                    setSelectedActivities={setSelectedActivities}
                                                                                          />
                                                                                )
                                                                      }}
                                                                      style={styles.activities}
                                                                      showsVerticalScrollIndicator={false}
                                                                      keyExtractor={(item, index) => index.toString()}
                                                            />
                                                  </View>
                                        }
                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', true)} onPress={onOpen}>
                                                  <View style={[styles.addButton]}>
                                                            <View style={styles.addButtonContent}>
                                                                      <Ionicons name="add" size={24} color="black" />
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View >
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    backgroundColor: '#fff'
          },
          subContent: {
                    flexDirection: "row",
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 10,
                    zIndex: 1,
                    position: "absolute",
                    bottom: 5,
          },
          addButton: {
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#000',
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    zIndex: 30
          },
          addButtonContent: {
                    width: '70%',
                    height: '70%',
                    borderRadius: 15,
                    backgroundColor: smallGreenWhiteColor,
                    justifyContent: 'center',
                    alignItems: 'center'
          },

          content: {
                    alignItems: 'center',
          },
          title: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 80
          },
          emptyImageFeedBack: {
                    maxWidth: '80%',
                    maxHeight: '30%',
                    marginVertical: 30,
                    marginLeft: -40
          },
          emptyTextFeedback: {
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 22,
                    color: '#5E5E5E'
          },
          bottomSheet: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#f1f1f1',
                    shadowColor: "#000",
                    elevation: 5,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          activitiesList: {
                    marginTop: 60,
                    paddingHorizontal: 20
          },
          activities: {
          }
})