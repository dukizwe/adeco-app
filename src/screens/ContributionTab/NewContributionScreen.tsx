import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { FlatList, Text, View, BackHandler } from 'react-native'
import UserPayListHeader from '../../components/ContributionTab/NewContributionScreen/UserPayListHeader'
import Contributor from '../../components/ContributionTab/NewContributionScreen/Contributor'
import ContributionQuickActions from '../../components/ContributionTab/NewContributionScreen/ContributionQuickActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { queueListSelector, startAnimationSelector, usersSelector } from '../../store/selectors/contributionSelectors'
import { useSelector } from 'react-redux'
import fetchApi from '../../utils/fetchApi'
import { ContributorInterface } from '../../interfaces/ContributorInterface'
import { RateTypeInterface } from '../../interfaces/RateTypeInterface'
import { useDispatch } from 'react-redux'
import { setContributorsAction, setRateTypesAction } from '../../store/actions/contributionActions'
import ContributorsSkeletons from '../../components/skeleton/Skeleton'
import wait from '../../helpers/wait'

/**
 * A sceen to display users contributors for actions
 * @returns {JSX.Element}
 * @author <mbagapro@gmail.com>
 */
export default function NewContributionScreen(): JSX.Element {
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
                                        setIsLoading(false)
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
          if(isLoading) {
                    return <ContributorsSkeletons />
          }
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