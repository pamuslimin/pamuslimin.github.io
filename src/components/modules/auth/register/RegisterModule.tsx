import { Anchor, Button, createStyles, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Link } from "@tanstack/react-location";
import clsx from "clsx";
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';

import styles from "./RegisterModule.module.scss";
import { supabase } from "@/supabaseClient";
const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const RegisterModule = () => {
  const { classes } = useStyles();

  const onSubmit = (value: Record<string, string>) => {
    const { username, password, confirmpassword } = value;
    if (password !== confirmpassword) {
      return { [FORM_ERROR]: 'Password Tidak Sama' };
    }
    if (!username) {
      return { [FORM_ERROR]: "Email tidak boleh kosong"};
    }

    if (!password) {
      return { [FORM_ERROR]: "Password tidak boleh kosong"};
    }
    supabase.auth.signUp({
      email: username,
      password: password,
    });
  };


  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        username: "",
        password: "",
        confirmpassword: ""
      }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Title order={2} className={clsx(classes.title, styles.title)} align='center' mt='md' mb={50}>
            Daftar Pengurus
          </Title>
          <Field name="username"
            render={({ input }) => {
              return (<TextInput label='Email address' placeholder='hello@gmail.com' size='md' {...input} />);
            }}
          />
          <Field
            name='password'
            render={({ input }) => (
              <PasswordInput
                label='Password'
                placeholder='Password'
                mt='md'
                size='md'
                required
                {...input}
              />
            )}
          />
          <Field
            name='confirmpassword'
            render={({ input }) => (
              <PasswordInput
                label='Konfirmasi Password'
                placeholder='ketik ulang Password'
                mt='md'
                size='md'
                required
                {...input}
              />
            )}
          />

          <Button type="submit" fullWidth mt='xl' size='md'>
            Daftar
          </Button>

          <Text align='center' mt='md'>
            Sudah Punya Akun?{" "}
            <Link to='/auth/login' replace>
              Login
            </Link>
          </Text>
        </form>)
      }></Form>
  );
};

export default RegisterModule;
