
import { supabase } from "@/supabaseClient";
import { Button, Checkbox, PasswordInput, TextInput, Title, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Form, Field } from "react-final-form";

const LoginModule = () => {
  const theme = useMantineTheme();
  const onSubmit = async (values: any) => {
    try {
      const { email, password } = values;
      const accessToken = "";

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log("data", data);
      if (error) throw error;
      localStorage.setItem("accessToken", data.session?.access_token ?? "");
      localStorage.setItem("profile", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      showNotification({
        title: "Login Gagal",
        message: "Username atau Password Salah",
        color: "red",
      });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        email: "",
        password: "",
      }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Title order={3} mb='md'>
            Masuk
          </Title>
          <Field
            name='email'
            render={({ input }) => (
              <TextInput label='Username' placeholder='Username' size='md' required {...input} />
            )}
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
          <Checkbox label='Ingat saya' mt='xl' size='md' />
          <Button fullWidth mt='xl' size='md' type='submit' loading={submitting}>
            Masuk
          </Button>
        </form>
      )}
    />
  );
};

export default LoginModule;
