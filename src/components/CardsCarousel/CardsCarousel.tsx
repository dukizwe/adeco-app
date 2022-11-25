import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, View, Text, ScrollView, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Carousel from 'react-native-snap-carousel'
import randomInt from '../../helpers/randomInt';
import subText from '../../helpers/subText';
import Card from './Card';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import NavigationIndicator from './NavigationIndicator';


const cardColors = ['#18a8c9', '#5d647f', '#3555a2', '#1b3555']
export const entries = [
          {
                    userId: 1,
                    id: 1,
                    image: require("../../../assets/cards/card1.png"),
                    color: cardColors[randomInt(0, cardColors.length  - 1, 10)],
                    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          {
                    userId: 1,
                    id: 2,
                    image: require("../../../assets/cards/card2.png"),
                    color: cardColors[randomInt(0, cardColors.length  - 1, 10)],
                    title: "qui est esse",
                    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
          },
          {
                    userId: 1,
                    id: 3,
                    image: require("../../../assets/cards/card3.png"),
                    color: cardColors[randomInt(0, cardColors.length  - 1, 10)],
                    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
                    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
          },
          {
                    userId: 1,
                    id: 4,
                    image: require("../../../assets/cards/card4.png"),
                    color: cardColors[randomInt(0, cardColors.length  - 1, 10)],
                    title: "eum et est occaecati",
                    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
          },
          {
                    userId: 1,
                    id: 5,
                    image: require("../../../assets/cards/card5.png"),
                    color: cardColors[randomInt(0, cardColors.length  - 1, 10)],
                    title: "nesciunt quas odio",
                    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
          },
];

const { width, height } = Dimensions.get('window')
export default function CardsCarousel({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
          const [showModal, setShowModal] = useState(false)
          const [activendex, setActiveIndex] = useState(entries.length-1)
          const scrollViewRef = useRef<ScrollView>(null);
          useEffect(() => {
                    setLoading(true)
                    setTimeout(() => {
                              setLoading(false)
                    }, 2000)
          }, [activendex])
          return (
                    <View style={styles.carouselContainer}>
                              <ScrollView style={styles.carousel}
                                        horizontal={true}
                                        pagingEnabled={true} /* scrollEventThrottle={width - 60} */
                                        ref={scrollViewRef}
                                        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
                                        showsHorizontalScrollIndicator={false}
                                        // onScrollBeginDrag={() => setLoading(true)}
                                        onScroll={(e) => {
                                                  const index = e.nativeEvent.contentOffset.x / (width - 40)
                                                  setActiveIndex(parseInt(index.toString()))
                                        }}>
                                                  {entries.map((item, index) => {
                                                            return <View style={styles.slide} key={index.toString()}>
                                                                      <Card item={item} />
                                                            </View>
                                                  })}
                              </ScrollView>
                              <View style={styles.cardsFooter}>
                                        <NavigationIndicator activendex={activendex}/>
                                        <TouchableOpacity style={styles.footerDate}>
                                                  <Text style={styles.footerDateText}>25 nov 2022</Text>
                                        </TouchableOpacity>
                              </View>
                    </View>)
}