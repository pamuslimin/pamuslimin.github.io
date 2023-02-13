
import { supabase } from "@/supabaseClient";
import { Button, Checkbox, PasswordInput, TextInput, Title, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { GoogleLogo } from "phosphor-react";
import { Form, Field } from "react-final-form";

const LoginModule = () => { 
  const onSubmit = async (values: any) => {
    try {
      const { email, password } = values;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    
      if (error) throw error;
      const { data } = await supabase.auth.getSession()
      localStorage.setItem("accessToken", data.session?.access_token ?? "");
      localStorage.setItem("profile", JSON.stringify(data.session?.user));
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
          <Button leftIcon={<GoogleLogo/>} fullWidth mt='xl' size='md' type='submit' loading={submitting}>
            Masuk Dengan Google
          </Button>
        </form>
      )}
    />
  );
};

export default LoginModule;
