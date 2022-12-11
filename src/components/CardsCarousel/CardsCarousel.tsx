import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, View, Text, ScrollView, TouchableOpacity, TouchableNativeFeedback, FlatList, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel'
import randomInt from '../../helpers/randomInt';
import subText from '../../helpers/subText';
import Card from './Card';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';
import NavigationIndicator from './NavigationIndicator';
import { ContributionInterface } from '../../interfaces/api/ContributionInterface';
import moment from 'moment';
import { ContributorInterface } from '../../interfaces/ContributorInterface';


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

interface Props {
          contributions: ContributionInterface[],
          activendex: number,
          setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
          selectedContribution: ContributionInterface | null,
          defaultActiveIndex: number
}

export default function CardsCarousel({ contributions, activendex, setActiveIndex, selectedContribution, defaultActiveIndex }: Props) {
          const scrollViewRef = useRef<FlatList>(null);
          const { width } = useWindowDimensions()

          return (
                    <View style={styles.carouselContainer}>
                              <FlatList
                                        data={contributions}
                                        style={styles.carousel}
                                        horizontal={true}
                                        pagingEnabled={true} /* scrollEventThrottle={width - 60} */
                                        ref={scrollViewRef}
                                        onContentSizeChange={() => {
                                                  scrollViewRef.current?.scrollToEnd({ animated: false })
                                        }}
                                        showsHorizontalScrollIndicator={false}
                                        // onScrollBeginDrag={() => setLoading(true)}
                                        onScroll={(e) => {
                                                  const index = e.nativeEvent.contentOffset.x / (width - 20)
                                                  setActiveIndex(parseInt(index.toString()))
                                        }}
                                        renderItem={({item: contribution, index}) => {
                                                  return <View style={styles.slide} key={index.toString()}>
                                                            <Card contribution={contribution} />
                                                  </View>
                                        }}
                              />
                              <View style={styles.cardsFooter}>
                                        <NavigationIndicator contributionsLength={contributions.length} activendex={activendex}/>
                                        <TouchableOpacity style={styles.footerDate}>
                                                  <Text style={styles.footerDateText}>
                                                            { moment(selectedContribution?.contributionDate).format('DD MMM YYYY').toLowerCase() }
                                                  </Text>
                                        </TouchableOpacity>
                              </View>
                    </View>)
}