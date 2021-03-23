import React from "react";
import { Formik } from "formik";
import { TextInput, Surface, Title, Button } from "react-native-paper";
import { TextStyle, ViewStyle } from "react-native";

type Props = {
  title: string;
  initialValues: Record<string, string>;
  onSubmit: (values: Record<string, string>) => void;
  styles: Record<string, ViewStyle | TextStyle>;
  submitMessage: string;
};

export function StorageForm(props: Props) {
  const { initialValues, title, onSubmit, styles, submitMessage } = props;
  const fields = Object.keys(initialValues);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <Title style={styles.title}>{title}</Title>
          {fields.map((field, index) => (
            <TextInput
              mode="outlined"
              placeholder={field}
              style={styles.input}
              key={index}
              onChangeText={handleChange(field)}
              onBlur={handleBlur(field)}
              value={values[field]}
            />
          ))}
          <Button onPress={handleSubmit}>{submitMessage}</Button>
        </>
      )}
    </Formik>
  );
}
