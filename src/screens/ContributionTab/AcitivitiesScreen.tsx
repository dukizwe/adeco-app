import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, useWindowDimensions, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Ionicons } from '@expo/vector-icons';
import { smallGreenWhiteColor } from "../../styles";
import ActivityForm from "../../components/ContributionTab/ActivityForm";
import { gestureHandlerRootHOC, GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig, runOnJS } from "react-native-reanimated";
import { Portal } from "@gorhom/portal";
import { Modalize } from 'react-native-modalize';


export default function AcitivitiesScreen() {
          const { width, height } = useWindowDimensions()
          const top = useSharedValue(height)
          const formRef = useRef<Modalize>(null);
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

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

          const openBottomSheet = () => {
                    setIsOpen(true)
                    top.value = withSpring(
                              height / 2,
                              SPRING_CONFIG
                    )
          }
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
          return (
                    <>
                              <ActivityForm formRef={formRef} isOpen={isOpen} setIsOpen={setIsOpen} loadingForm={loadingForm} setLoadingForm={setLoadingForm} />
                              <View style={styles.container}>
                                        <View style={styles.content}>
                                                  <Text style={styles.title}>Activités</Text>
                                                  <Image source={require('../../../assets/images/note_list_2.png')} style={styles.emptyImageFeedBack} />
                                                  <Text style={styles.emptyTextFeedback}>
                                                            Cliquer sur le bouton <Ionicons name="add-circle-sharp" size={24} color={smallGreenWhiteColor} /> pour ajouter une activité
                                                  </Text>
                                        </View>
                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', true)} onPress={onOpen}>
                                                  <View style={styles.addButton}>
                                                            <View style={styles.addButtonContent}>
                                                                      <Ionicons name="add" size={24} color="black" />
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View >
                              {/* <Portal>
                                        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', width: '100%' }}>
                                                  <PanGestureHandler onGestureEvent={gestureHandler}>
                                                            <Animated.View style={[styles.bottomSheet, animatedTopStyles]}>
                                                                      <Text>Sheet</Text>
                                                            </Animated.View>
                                                  </PanGestureHandler>
                                        </GestureHandlerRootView>
                              </Portal> */}
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
                    bottom: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
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
          }
})