import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { FlatList, Text, View, BackHandler } from 'react-native'
import UserPayListHeader from '../../components/ContributionTab/UserPayListHeader'
import Contributor from '../../components/ContributionTab/Contributor'
import ContributionQuickActions from '../../components/ContributionTab/ContributionQuickActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { queueListSelector, startAnimationSelector, usersSelector } from '../../store/selectors/contributionSelectors'
import { useSelector } from 'react-redux'
import fetchApi from '../../utils/fetchApi'
import { ContributorInterface } from '../../interfaces/ContributorInterface'
import { RateTypeInterface } from '../../interfaces/RateTypeInterface'
import { useDispatch } from 'react-redux'
import { setContributorsAction, setRateTypesAction } from '../../store/actions/contributionActions'

export default function NewContributionScreen() {
          const users = useSelector(usersSelector)
          const startAnimation = useSelector(startAnimationSelector)
          const [contributors, setContributors] = useState<ContributorInterface[]>([])
          const [rateTypes, setRateTypes] = useState<RateTypeInterface[]>([])
          const [isLoading, setIsLoading] = useState(true)
          
          const dispacth = useDispatch()
          useEffect(() => {
                    (async () => {
                              try {
                                        const res = await fetchApi('/contributions/contribuables')
                                        setContributors(res.data)
                                        dispacth(setContributorsAction(res.data))
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setIsLoading(true)
                              }
                    })()
          }, [])
          useEffect(() => {
                    (async () => {
                              try {
                                        const res = await fetchApi("/rates/types")
                                        setRateTypes(res.data)
                                        dispacth(setRateTypesAction(res.data))
                              } catch (error) {
                                        console.log(error)
                              } finally {
                              }
                    })()
          }, [])
          return (
                    <View style={{backgroundColor: '#fff', paddingHorizontal: 10, flex: 1}}>
                              <FlatList
                                        ListHeaderComponent={() => <UserPayListHeader />}
                                        showsVerticalScrollIndicator={false}
                                        data={contributors}
                                        keyExtractor={(user, index) => index.toString()} renderItem={({ item: contributor }) => <Contributor contributor={contributor} rateTypes={rateTypes} />}
                              />
                              {startAnimation && <ContributionQuickActions contributors={contributors} />}
                    </View>
          )
}