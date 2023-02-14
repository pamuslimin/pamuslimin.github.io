
import { supabase } from "@/supabaseClient";
import { Button, Checkbox, PasswordInput, TextInput, Title, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { GoogleLogo, Phone } from "phosphor-react";
import { Form, Field } from "react-final-form";

const LoginModule = () => {
  const onSubmit = async (values: any) => {
    try {
      const { phone } = values;
      localStorage.setItem("accessToken", "user");
      localStorage.setItem("phone", phone);
      localStorage.setItem("profile", JSON.stringify({ name: "donor", phone: phone }));
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
        phone: "",
      }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="phone"
            render={({ input }) => {
              return <TextInput label="Nomor Telepon anda" value={input.value} onChange={input.onChange} />;
            }} />
          <Button leftIcon={<Phone />} fullWidth mt='xl' size='md' type='submit' loading={submitting}>
            Masuk
          </Button>
        </form>
      )}
    />
  );
};

export default LoginModule;
