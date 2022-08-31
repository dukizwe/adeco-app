import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

interface Props {
          formRef: React.RefObject<Modalize>
}

export default function ActivityForm({ formRef }: Props) {
          return (
                              <View style={styles.formContainer}>
                                        <Text>hey there</Text>
                              </View>
          )
}

const styles = StyleSheet.create({
          formContainer: {

          }
})