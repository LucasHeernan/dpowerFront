import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import FormSubmitButton from "./FormSubmitButton";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";
import {updateUser} from "../redux/actions/index"
import { Formik } from "formik";
import * as Yup from "yup";


export default function FormRegisterUser({ navigation }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)
  const mail = user[0].data.id
  const userInfo = {
    name: '',
    age: 0,
    sport: '',
    description: "",
    nationality: ""
  };

  const [error, setError] = useState('');

  const { name, age, sport, description, nationality } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError('Required all fields!', setError);
    // if valid name with 3 or more characters
    if (!name.trim() || name.length < 3)
      return updateError('Invalid name!', setError);
    // password must have 8 or more characters
    if (!sport.trim() || sport.length < 2)
      return updateError('Password is less then 8 characters!', setError);
    // password and confirm password must be the same
    if (age > 100 || age < 6)
      return updateError('Invalid Age!', setError);

    return true;
  };

  const isValidObjField = obj => {
    return Object.values(obj).every(value => value.trim());
  };
  
  const isValidUrl = value => {
    const regexUrl = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
    return regexUrl.test(value)
  }
  
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('');
    }, 2500);
  };
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, 'Invalid name!')
      .required('Name is required!'),
    age: Yup.number()
      .integer()
      .required("Age is required!")
      .positive("Age must be positive!"),
    sport: Yup.string()
      .trim()
      .min(2, "Too short sport!")
      .max(20, "Invalid sport!"),
    description: Yup.string()
      .max(150, "Description is too large!")
      .min(10, "Description is too short!"),
    nationality: Yup.string()
      .trim()
  });

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    dispatch(updateUser({...values, mail}))

    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { name, age, description, sport, nationality} = values;
          return (
            <>
              <FormInput
                value={name}
                error={touched.name && errors.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                label='Name'
                placeholder={user[0].data.name}
              />
              <FormInput
                value={age}
                error={touched.age && errors.age}
                onChangeText={handleChange('age')}
                onBlur={handleBlur('age')}
                autoCapitalize='none'
                label='Age'
                placeholder='Put your age...'
              />
              <FormInput
                value={sport}
                error={touched.sport && errors.sport}
                onChangeText={handleChange('sport')}
                onBlur={handleBlur('sport')}
                label='Sport'
                placeholder='Input your sport...'
              />
              <FormInput
                value={nationality}
                error={touched.nationality && errors.nationality}
                onChangeText={handleChange('nationality')}
                onBlur={handleBlur('nationality')}
                label='Nationality'
                placeholder='Nationality...'
              />
              <FormInput
                value={description}
                error={touched.description && errors.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                label='Description'
                placeholder='Description...'
              />
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title='Update!'
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20
  }
});