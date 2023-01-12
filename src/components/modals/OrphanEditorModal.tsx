import { OrphanModel } from "@/routes/orphanRoute";
import { Button, Group, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";
import { FormApi, SubmissionErrors } from "final-form";
import { Field, Form } from "react-final-form";

export const OrphanEditorModal = (props: ContextModalProps<{ onClick: (values: Record<string, any>) => void; initialValues: Record<string, any>; }>) => {

    const { context, id, innerProps } = props;
    /* additional_info?: string | null;
      avatar_url?: string | null;
      birthdate?: string | null;
      birthplace?: string | null;
      full_name?: string;
      gender?: boolean | null;
      id?: string;
      medical_history?: string | null;
      status?: string | null; */
    return (<>
        <Form<OrphanModel> onSubmit={
            function (values: OrphanModel): void | SubmissionErrors | Promise<SubmissionErrors> {
                innerProps.onClick?.(values);
                context.closeModal(id);
            }}
            initialValues={innerProps.initialValues}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <SimpleGrid cols={2}>
                        <Field
                            name="full_name"
                            render={({ input, meta }) => (
                                <TextInput label="Nama Lengkap" {...input} />
                            )}
                        />
                        <Field
                            name="birthplace"
                            render={({ input, meta }) => (
                                <TextInput label="Tempat Lahir" {...input} />
                            )}
                        />

                        <Field
                            name="birthdate"
                            render={({ input, meta }) => (
                                <DatePicker label="Tempat Lahir" {...input} />
                            )}
                        />

                        <Field
                            name="gender"
                            render={({ input, meta }) => (
                                <Select label="Jenis Kelamin" data={[{ value: "false", label: "Perempuan" }, { value: "true", label: "Laki Laki" }]} {...input} />
                            )}
                        />
                    </SimpleGrid>
                    <Field
                        name="medical_history"
                        render={({ input, meta }) => (
                            <Textarea label="Riwayat Medis" {...input} />
                        )}
                    />
                    <Field
                        name="additional_info"
                        render={({ input, meta }) => (
                            <Textarea label="Informasi Tambahan" {...input} />
                        )}
                    />
                    <Group position="apart" grow>
                        <Button fullWidth mt="md" variant="light" type="button" onClick={() => context.closeModal(id)}>
                            Batal
                        </Button>
                        <Button fullWidth mt="md" type="submit">
                            Simpan
                        </Button>
                    </Group>
                </form>
            )
            }
        />

    </>);

};
