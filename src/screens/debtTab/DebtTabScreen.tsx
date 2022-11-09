import React, { useEffect, useState } from "react";
import { findNodeHandle, FlatList, Keyboard, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Entypo, Feather, MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import DebtForm from "../../components/ContributionTab/DebtForm";
import { useForm } from "../../hooks/useForm";
import { UserDebtFormInterface } from "../../types/DebtFormInterface";
import wait from "../../helpers/wait";
import Loading from "../../components/app/Loading";
import fetchApi from "../../utils/fetchApi";
import { UserDebtInterface } from "../../interfaces/UserDebtInterface";
import UserDebt from "../../components/ContributionTab/UserDebt";
import ErrorModal from "../../components/Modals/ErrorModal";
import { ApiResponse } from "../../types/ApiResponse";

export default function DebtTabScreen() {
          const navigation = useNavigation()
          const [showForm, setShowForm] = useState(false)
          const [isSending, setIsSending] = useState(false)
          const [debts, setDebts] = useState<UserDebtInterface[]>([])
          const [error, setError] = useState<null|string>(null)
          const [data, handleChange] = useForm({
                    amount: "",
                    month: "",
                    comment: "",
          })
          const onSubmit = async () => {
                    try {
                              setIsSending(true)
                              Keyboard.dismiss()
                              const newDebt = await fetchApi('/debts', {
                                        method: "POST",
                                        body: JSON.stringify({
                                                  amount: parseInt(data.amount),
                                                  comment: data.comment
                                        }),
                                        headers: { "Content-Type": "application/json" },
                              })
                              console.log(newDebt)
                    } catch (error: any) {
                              console.log(error)
                              const apiError: ApiResponse = error
                              setError(apiError.message)
                    } finally {
                              setIsSending(false)
                    }
          }

          useEffect(() => {
                    (async () => {
                              try {
                                        const result = await fetchApi('/debts')
                                        setDebts(result.data)
                              } catch (error) {
                                        console.log(error)
                              } finally {

                              }
                    })()
          }, [])
          return (
                    <>
                    {error && <ErrorModal onClose={() => setError(null)} body={error} handleTitle="Ok" />}
                    <View style={styles.container}>
                              {isSending && <Loading />}
                              {showForm && <DebtForm
                                        onClose={() => setShowForm(false)}
                                        onSubmit={onSubmit}
                                        data={data}
                                        handleChange={handleChange}
                              />}
                              <View style={styles.header}>
                                        <Text style={styles.title}>
                                                  Les dettes
                                        </Text>
                                        <View style={styles.contributionRightSide}>
                                                  <TouchableNativeFeedback useForeground onPress={() => setShowForm(true)}>
                                                            <View style={{ overflow: "hidden", borderRadius: 10 }}>
                                                                      <View style={styles.headerIconTitle}>
                                                                                <Ionicons name="ios-add-circle" size={24} color={COLORS.primary} />
                                                                                <Text style={[styles.headerBtnTitle, { color: COLORS.primary }]}>Demander</Text>
                                                                      </View>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                              </View>
                              <View style={styles.subHeader}>
                                        <TouchableOpacity>
                                                  <View style={styles.selectedStatusBtn}>
                                                            <Text style={styles.statusTitle}>
                                                                      En ettente de validation
                                                            </Text>
                                                            <Entypo name="chevron-small-down" size={24} color="#777" />
                                                  </View>
                                        </TouchableOpacity>
                                        <Text style={styles.statusCount}>
                                                  2
                                        </Text>
                              </View>
                              <FlatList
                                        // ListHeaderComponent={() => <DebtScreenHeader />}
                                        showsVerticalScrollIndicator={false}
                                        data={debts}
                                        keyExtractor={(user, index) => index.toString()}
                                        renderItem={({ item }) => {
                                                  return (
                                                            <UserDebt
                                                                      userDebt={item}
                                                            />
                                                  )
                                        }}
                                        style={styles.debts}
                              />
                    </View>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {

          },
          header: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10
          },
          title: {
                    fontWeight: "bold",
                    color: '#777',
                    fontSize: 18
          },
          contributionRightSide: {

          },
          headerIconTitle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F1F1F1',
                    paddingHorizontal: 10,
                    paddingVertical: 5
          },
          headerBtnTitle: {
                    color: '#777',
                    marginLeft: 5,
                    fontWeight: 'bold',
                    fontSize: 13
          },
          subHeader: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    marginTop: 20
          },
          statusTitle: {
                    fontWeight: "bold",
                    color: '#333',
                    opacity: 0.8,
                    marginRight: 5
          },
          selectedStatusBtn: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          statusCount: {
                    fontSize: 16,
                    color: '#777'
          },
          debts: {
                    paddingHorizontal: 10
          }
})