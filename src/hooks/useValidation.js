import { useEffect, useState } from "react"

export const useValidation = (value, validations) => {
    const [emailError, setEmailError] = useState(false)
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        outer: for(const validation in validations) {
            switch (validation) {
                case 'minLength':
                    if(value.length < validations[validation]) {
                        setMinLengthError(true)   
                        setErrorMsg('Некорректная длина!')    
                    } else {
                        setMinLengthError(false)
                    }
                    break;
                case 'isEmpty':
                    if(value) {
                        setEmpty(false)
                    } else {
                        setEmpty(true)
                        setErrorMsg('Поле не может быть пустым!')
                        break outer
                    }
                    break;
                case 'isEmail':
                    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
                    if(EMAIL_REGEXP.test(value)) {
                        setEmailError(false)
                    } else {
                        setEmailError(true)
                        setErrorMsg('Некорректный email!')
                    }
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || emailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
            setErrorMsg('')
        }
    }, [isEmpty, minLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        errorMsg,
        emailError,
        inputValid,
    }
}