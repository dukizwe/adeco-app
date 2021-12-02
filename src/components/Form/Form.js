import React from 'react'
import { Input as InputBase } from 'native-base'
export const Input = ({ name, value, onChangeText, ...props }) => {
          return <InputBase
                    value={value}
                    onChangeText={(newValue) => onChangeText(name, newValue)}
                    {...props}
          />
}