import { useState, useCallback } from "react";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

// import { useState, useCallback } from "react";

// export const useForm = (defaultValues = {}) => {
//   const [values, setValues] = useState(defaultValues);
//   const [errors, setErrors] = useState({});
//   const [isValid, setIsValid] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, validationMessage, form } = e.target;

//     setValues((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: validationMessage }));
//     setIsValid(form.checkValidity());
//   };

//   const resetForm = useCallback(
//     (newValues = {}, newErrors = {}, newIsValid = false) => {
//       setValues(newValues);
//       setErrors(newErrors);
//       setIsValid(newIsValid);
//     },
//     []
//   );

//   return { values, handleChange, errors, isValid, resetForm };
// };
