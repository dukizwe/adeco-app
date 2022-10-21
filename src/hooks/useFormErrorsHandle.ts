import { useState } from "react"
import Validation from "../class/Validation"

/**
 * le hook pour l'affichage des erreurs de formulaire en temps réel
 * @param {Object} data les donnés à controler
 * @param {Object} rules les règles pour les données
 * @param {Object} customMessages les messages personnalisés pour les erreurs
 * @returns {Object} un objet contenant les fonctions
 */
export const useFormErrorsHandle = <Data>(data: Data, rules: { [key in keyof Data]: any}, customMessages: { [key in keyof Data]: any }) => {
          type Errors = {
                    [key in keyof Data]: string[]
          }
          const initials: any = {}
          const [errors, setErrors] = useState<Errors>(initials)

          const validation = new Validation(data, rules, customMessages)

          const setError = (key: keyof  Data, errors: string[]): void => {
                    setErrors(err =>( {...err, [key]: errors}))
          }

          const checkFieldData = (name: keyof  Data) => {
                    const errors = validation.getError(name)
                    if(errors?.length !== 0) {
                              setError(name, errors)
                    }
          }

          const hasError: (name: keyof  Data) => boolean = name => errors[name] ? true : false

          const getError: (name: keyof  Data) => string = name => errors[name][0]

          const getErrors = () => validation.getErrors()

          const isValidate = () => {
                    validation.run()
                    return validation.isValidate()
          }

          const run = () => validation.run()

          return {
                    errors, setErrors, setError, getError, hasError, checkFieldData, getErrors, isValidate, run
          }
}