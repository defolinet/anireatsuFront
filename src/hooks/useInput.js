import { useEffect, useState } from "react"
import { useValidation } from "./useValidation"

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const [errorMsg, setErrorMsg] = useState()

    useEffect(() => {
        isDirty && setErrorMsg(valid.errorMsg)
    }, [valid.errorMsg, isDirty])

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid, 
        errorMsg,
    }
}