import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Modal, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, useWindowDimensions, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { smallGreenWhiteColor } from "../../styles";
import { Portal } from "@gorhom/portal";
import { Modalize } from 'react-native-modalize';
import { useSelector } from "react-redux";
import { queueActivitiesSelector } from "../../store/selectors/contributionSelectors";
import Activity from "../../components/Activities/Activity";
import ActivitiesScreenHeader from "../../components/ContributionTab/ActivitiesScreen/ActivitiesScreenHeader";
import { Activity as ActivityInterface } from "../../types/Activity";
import { ActivityCategoryInterface } from "../../types/ActivityCategoryInterface";
import fetchApi from "../../utils/fetchApi";
import { setActivitiesAction } from "../../store/actions/contributionActions";
import { useDispatch } from "react-redux";
import ActivityForm from "../../components/ContributionTab/ActivitiesScreen/ActivityForm";

export default function AcitivitiesScreen() {
          const { width, height } = useWindowDimensions()
          
          const formRef = useRef<Modalize>(null);
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const [isInSelect, setIsInSelect] = useState<boolean>(false)
          const [selectedActivites, setSelectedActivities] = useState<ActivityInterface[]>([])

          const [categories, setCategories] = useState<ActivityCategoryInterface[]>([])

          const activities = useSelector(queueActivitiesSelector)
          const dispatch = useDispatch()

          const handleRemove = () => {
                    const ids = selectedActivites.map(a => a.id)
                    const newActivities = activities.filter((activity) => !ids.includes(activity.id))
                    dispatch(setActivitiesAction(newActivities))
                    setIsInSelect(false)
          }

          const onLongPress = (activity: ActivityInterface) => {
                    if(isInSelect) return false
                    setIsInSelect(true)
                    setSelectedActivities(t => [...t, activity])
          }

          const isSelected = (id: string) => {
                    return selectedActivites.find((t, i) => t.id == id) ? true : false
          }

          const onOpen = () => {
                    setIsOpen(true)
                    formRef.current?.open();
          };
          
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
                                                  <Text style={styles.title}>Activit??s</Text>
                                                  <Image source={require('../../../assets/images/note_list_2.png')} style={styles.emptyImageFeedBack} />
                                                  <Text style={styles.emptyTextFeedback}>
                                                            Cliquer sur le bouton <Ionicons name="add-circle-sharp" size={24} color={smallGreenWhiteColor} /> pour ajouter une activit??
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
                                                                                                    isSelected={activity.id ? isSelected(activity.id) : false}
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
                    backgroundColor: '#fff',
                    marginTop: -60
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
                    alignItems: 'center'
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
                    paddingHorizontal: 10
          },
          activities: {
          }
})