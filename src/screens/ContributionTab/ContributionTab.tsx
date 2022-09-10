import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { FlatList, Text, View, BackHandler } from 'react-native'
import UserPayListHeader from '../../components/ContributionTab/UserPayListHeader'
import UserPayment from '../../components/ContributionTab/UserPayment'
import ContributionQuickActions from '../../components/ContributionTab/ContributionQuickActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import { startAnimationSelector, usersSelector } from '../../store/selectors/contributionSelectors'
import { useSelector } from 'react-redux'

export default function ContributionTab() {
          const users = useSelector(usersSelector)
          const startAnimation = useSelector(startAnimationSelector)
          return (
                    <View style={{backgroundColor: '#fff', paddingHorizontal: 20, flex: 1}}>
                              <FlatList
                                        ListHeaderComponent={() => <UserPayListHeader />}
                                        showsVerticalScrollIndicator={false}
                                        data={users}
                                        keyExtractor={(user, index) => index.toString()} renderItem={({ item }) => <UserPayment user={item} />}
                              />
                              {startAnimation && <ContributionQuickActions />}
                    </View>
          )
}