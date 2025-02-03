import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        userName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => setErrors({error}))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required("Display Name is required"),
        userName: Yup.string().required("User Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Signup to Reactvities"
            color="teal"
            textAlign="center"
          />
          <TextInput placeholder="Display Name" name="displayName" />
          <TextInput placeholder="User Name" name="userName" />
          <TextInput placeholder="Email" name="email" />
          <TextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <ValidationError errors={errors.error as unknown as string[]} />
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive content="Register"
            type="submit" fluid
          />
        </Form>
      )}
    </Formik>
  );
});
