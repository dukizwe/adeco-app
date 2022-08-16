import React, { useState } from "react"

/**
 * le hook pour controler les formulaires
 * @param {Object} initials les donnes par défault
 * @returns {Array} un tableau contenant les [nouveaux donnees, le handleChange, le setValeur des donnés]
 */


export const useForm = <Initials>(initials: Initials): [Initials, (name: keyof  Initials, value: Initials[typeof name]) => void, React.Dispatch<React.SetStateAction<Initials>>] => {
          const [data, setData] = useState<Initials>(initials)

          const handleChange = (name: keyof Initials, value: Initials[typeof name]) => {
                    setData(d => ({...d, [name]: value}))
          }

          const setValue = (name: keyof Initials, value: string) => {
                    setData(d => ({...d, [name]: value}))
          }
          return [data, handleChange, setData]
}