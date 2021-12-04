import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableNativeFeedback, TouchableOpacity, ScrollView } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import subText from '../helpers/subText';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Modal } from 'native-base'
import randomInt from '../helpers/randomInt';

export default function HomeScreen() {
          useEffect(() => {
                    (async () => {
                              // await AsyncStorage.removeItem('user')
                    })()
          }, [])
          const [showModal, setShowModal] = useState(false)
          const entries = [
                    {
                              userId: 1,
                              id: 1,
                              image: require("../../assets/slide1.jpg"),
                              title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                              body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
                    },
                    {
                              userId: 1,
                              id: 2,
                              image: require("../../assets/slide2.jpg"),
                              title: "qui est esse",
                              body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
                    },
                    {
                              userId: 1,
                              id: 3,
                              image: require("../../assets/slide3.jpg"),
                              title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                              body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
                    },
                    {
                              userId: 1,
                              id: 4,
                              image: require("../../assets/slide4.jpg"),
                              title: "eum et est occaecati",
                              body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
                    },
                    {
                              userId: 1,
                              id: 5,
                              image: require("../../assets/slide5.jpg"),
                              title: "nesciunt quas odio",
                              body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
                    },
          ];
          const renderItem = ({item, index}) => {
                    return <View style={styles.slide}>
                                        <View style={styles.slideHeader}>
                                                  <ImageBackground source={item.image} borderRadius={10} resizeMode='cover' style={styles.slideImage}>
                                                            <Text style={styles.slideTitle}>{subText(item.title)}</Text>
                                                            <Text style={styles.slideWrap}>{subText(item.title)}</Text>
                                                  </ImageBackground>
                                        </View>
                                        {/* <View style={styles.slideBody}>
                                                  <Text style={styles.slideBodyText} numberOfLines={4}>{item.body}</Text>
                                                  <Text style={styles.mutedBodyText} numberOfLines={1}>{subText(item.body, 100)}</Text>
                                        </View> */}
                      </View>
          }
          const FreshModal = () => {
                    return (<Modal isOpen={showModal} onClose={() => setShowModal(false)} size='xl'>
                              <Modal.Content maxWidth="400px">
                                        <Modal.CloseButton />
                                        <Modal.Body style={{marginTop: 25}}>
                                                  {entries.map((item, i) =>
                                                            <TouchableNativeFeedback
                                                                      key={i.toString()}
                                                                      accessibilityRole="button"
                                                                      onPress={() => setShowModal(false)}
                                                                      background={TouchableNativeFeedback.Ripple('#c9c5c5', false)}>
                                                                                <View style={styles.modalItem}>
                                                                                          <Text style={styles.modalItemLabel} numberOfLines={2}>{subText(item.title, 30)}</Text>
                                                                                          <View style={styles.checkSqaure}>{randomInt(1, 5) == i+1 && <AntDesign name="check" size={18} color="black" />}</View>
                                                                                </View>
                                                            </TouchableNativeFeedback>)}
                                        </Modal.Body>
                              </Modal.Content>
                    </Modal>)
          }
          return (
                    <ScrollView style={styles.home}>
                              <View style={styles.carousel}>
                                        <Carousel
                                                  data={entries}
                                                  renderItem={renderItem}
                                                  sliderWidth={width - 60}
                                                  itemWidth={300}
                                                  loop={true}
                                                  autoplay={true}
                                        />
                              </View>
                              <View style={styles.quickActions}>
                                        <View style={styles.action}>
                                                  <View style={styles.actionIcon}>
                                                            <FontAwesome5 name="tasks" size={20} color='#fff' />
                                                  </View>
                                                  <Text style={styles.actionTitle}>Topup</Text>
                                        </View>
                                        <View style={styles.action}>
                                                  <View style={{...styles.actionIcon, backgroundColor: '#362b89ed'}}>
                                                            <Feather name="bell" size={24} color="#fff" />
                                                  </View>
                                                  <Text style={styles.actionTitle}>Transfer</Text>
                                        </View>
                                        <View style={styles.action}>
                                                  <View style={{...styles.actionIcon, backgroundColor: '#ffc107f5'}}>
                                                            <AntDesign name="barschart" size={24} color="#fff" />
                                                  </View>
                                                  <Text style={styles.actionTitle}>Withdraw</Text>
                                        </View>
                                        <View style={styles.action}>
                                                  <View style={{...styles.actionIcon, backgroundColor: '#40c2d7f5'}}>
                                                            <FontAwesome5 name="tasks" size={20} color='#fff' />
                                                  </View>
                                                  <Text style={styles.actionTitle}>More</Text>
                                        </View>
                              </View>
                              <View style={styles.transationsContainer}>
                                        <View style={styles.transanctionHeader}>
                                                  <Text style={styles.transationsTitle}>Transanctions</Text>
                                                  <TouchableOpacity onPress={() => setShowModal(true)}>
                                                  <View style={styles.category}>
                                                            <Text style={styles.selectedCategory}>All</Text>
                                                            <Entypo name="chevron-small-down" size={24} color="#777" />
                                                  </View>
                                                  </TouchableOpacity>
                                        </View>
                                        <Text style={styles.transanctionDate}>Today</Text>
                                        <View style={styles.transanction}>
                                                  <View style={styles.transanctionRight}>
                                                            <View style={{...styles.transanctionIcon, backgroundColor: '#362b891a'}}>
                                                                      <FontAwesome name="dollar" size={30} color="#362b89ed" />
                                                            </View>
                                                            <View style={styles.transanctionMiddle}>
                                                                      <Text style={styles.transationTitle}>Flight booking</Text>
                                                                      <Text style={styles.transationDay}>17 june 2019</Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.transanctionAmount}>
                                                            <Text style={{...styles.amountSign, color: '#362b89ed'}}>-</Text>
                                                            <Text style={styles.amount}>$5100.10</Text>
                                                  </View>
                                        </View>
                                        <View style={styles.transanction}>
                                                  <View style={styles.transanctionRight}>
                                                            <View style={styles.transanctionIcon}>
                                                                      <Feather name="shopping-bag" size={24} color="#40c2d7f5" />
                                                            </View>
                                                            <View style={styles.transanctionMiddle}>
                                                                      <Text style={styles.transationTitle}>Flight booking</Text>
                                                                      <Text style={styles.transationDay}>17 june 2019</Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.transanctionAmount}>
                                                            <Text style={styles.amountSign}>-</Text>
                                                            <Text style={styles.amount}>$5100.10</Text>
                                                  </View>
                                        </View>
                                        <Text style={styles.transanctionDate}>Last week</Text>
                                        <View style={styles.transanction}>
                                                  <View style={styles.transanctionRight}>
                                                            <View style={{...styles.transanctionIcon, backgroundColor: '#ffc10717'}}>
                                                                      <FontAwesome name="dollar" size={30} color="#ffc107f5" />
                                                            </View>
                                                            <View style={styles.transanctionMiddle}>
                                                                      <Text style={styles.transationTitle}>Flight booking</Text>
                                                                      <Text style={styles.transationDay}>17 june 2019</Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.transanctionAmount}>
                                                            <Text style={styles.amountSign}>-</Text>
                                                            <Text style={styles.amount}>$5100.10</Text>
                                                  </View>
                                        </View>
                                        <View style={styles.transanction}>
                                                  <View style={styles.transanctionRight}>
                                                            <View style={styles.transanctionIcon}>
                                                                      <FontAwesome name="dollar" size={30} color="#40c2d7f5" />
                                                            </View>
                                                            <View style={styles.transanctionMiddle}>
                                                                      <Text style={styles.transationTitle}>Flight booking</Text>
                                                                      <Text style={styles.transationDay}>17 june 2019</Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.transanctionAmount}>
                                                            <Text style={styles.amountSign}>-</Text>
                                                            <Text style={styles.amount}>$5100.10</Text>
                                                  </View>
                                        </View>
                              </View>
                              <FreshModal />
                    </ScrollView>
          )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
          home: {
                    paddingHorizontal: 30,
                    backgroundColor: '#fff',
                    height: '100%'
          },
          carousel: {
                    marginVertical: 30
          },
          slide: {
                    width: 300,
                    height: 200,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    elevation: 2,
          },
          slideHeader: {
                    width: '100%',
                    height: '100%',
          },
          slideImage: {
                    width: '100%',
                    height: '100%',
          },
          slideTitle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#fff',
                    marginLeft: 10
          },
          slideWrap: {
                    color: '#fff',
                    position: 'absolute',
                    marginLeft: 10,
                    marginBottom: 10,
                    bottom: 0
          },
          slideBody: {
                    paddingHorizontal: 10,
                    paddingVertical: 10
          },
          mutedBodyText: {
                    color: '#000',
                    opacity: 0.5,
                    paddingVertical: 5
          },
          action: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          quickActions: {
                    flexDirection: 'row',
                    justifyContent: 'space-between'
          },
          actionIcon: {
                    borderRadius: 20,
                    backgroundColor: '#873475',
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          actionTitle: {
                    marginTop: 5,
                    color: '#000',
                    opacity: 0.6,
                    fontWeight: 'bold'
          },
          transanctionHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginVertical: 20
          },
          transationsTitle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    opacity: 0.6
          },
          category: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 50,
          },
          selectedCategory: {

          },
          transanctionDate: {
                    color: '#000',
                    opacity: 0.5,
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginTop: 5
          },
          transanction: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: '#f2f6f7',
                    borderRadius: 10,
                    padding: 15,
                    marginVertical: 10
          },
          transanctionIcon: {
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: '#ebeded'
          },
          transanctionRight: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          transanctionMiddle: {
                    marginLeft: 15,
          },
          transationTitle: {
                    fontSize: 14,
                    color: '#000',
                    opacity: 0.7,
                    fontWeight: 'bold'
          },
          transationDay: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.5,
          },
          transanctionAmount: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          amountSign: {
                    color: 'red',
                    fontWeight: 'bold'
          },
          amount: {
                    fontWeight: 'bold'
          },
          modalItem: {
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          checkSqaure: {
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: '#777',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center'
          },
          modalItemLabel: {
                    marginLeft: 5,
                    width: '90%'
          }
          
})