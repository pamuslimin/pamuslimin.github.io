import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group, Stack,
  ActionIcon,
  Container,
} from '@mantine/core';
import { useNavigate } from '@tanstack/react-location';
import { MapPin, Phone } from 'phosphor-react';
import { Field, Form } from 'react-final-form';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][7]
      } 100%)`,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));


export function ContactPage() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  return (
    <Container size="xl">
      <div className={classes.wrapper}>
        <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <div>
            <Title className={classes.title}>Hubungi Kami</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              Berikan pesan, kritik maupun saran
            </Text>
            <Stack>
              <Group>
                <MapPin color="white" />
                <Text color="white">Jl. Dr. Saharjo Jl. Sawo IV No.2, RT.3/RW.7, Manggarai Sel., Kec. Tebet, Jakarta, Daerah Khusus Ibukota Jakarta 12860</Text>
              </Group>
              <Group>
                <Phone color="white" />
                <Text color="white">089522583893</Text>
              </Group>
            </Stack>
          </div>
          <div className={classes.form}>
            <Form onSubmit={
              function (values: Record<string, any>): void {

                const link = document.createElement("a");
                link.setAttribute("href", "https://wa.me/6281213516824?text=" + encodeURIComponent(values.message),);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              initialValues={{
                message: "Hallo, Ingin makan"
              }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="sender_phone"
                    render={({ input, meta }) => (
                      <TextInput {...input} label="No. Telpon"
                        placeholder="085131827474"
                        required
                        classNames={{ input: classes.input, label: classes.inputLabel }} />
                    )}
                  />
                  <Field
                    name="sender_name"
                    render={({ input, meta }) => (
                      <TextInput label="Nama" {...input}
                        mt="md"
                        classNames={{ input: classes.input, label: classes.inputLabel }} />
                    )}
                  />
                  <Field
                    name="message"
                    render={({ input, meta }) => (

                      <Textarea
                        required
                        label="Pesan anda"
                        placeholder="isi dengan pesan minimal 30 kata"
                        minRows={4}
                        mt="md"
                        classNames={{ input: classes.input, label: classes.inputLabel }} {...input}
                      />
                    )}
                  />
                  <Group position="right" mt="md">
                    <Button className={classes.control} type="submit">Send message</Button>
                  </Group>
                </form>
              )
              }
            />

          </div>
        </SimpleGrid>
      </div></Container>
  );
}