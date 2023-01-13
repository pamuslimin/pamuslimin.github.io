import { OrphanModel } from "@/routes/orphanRoute";
import { Button, Group, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";
import dayjs from "dayjs";
import { FormApi, SubmissionErrors } from "final-form";
import { Field, Form } from "react-final-form";

export const ManagementEditorModal = (props: ContextModalProps<{ onClick: (values: Record<string, any>) => void; initialValues: Record<string, any>; }>) => {

    const { context, id, innerProps } = props;
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
                                <DatePicker label="Tanggal Lahir" onChange={(v) => {
                                    input.onChange(dayjs(v).format("YYYY-MM-DD"));
                                }}
                                    value={dayjs(input.value).toDate()} />
                            )}
                        />

                        <Field
                            name="gender"
                            render={({ input, meta }) => (
                                <Select label="Jenis Kelamin" data={[{ value: "false", label: "Perempuan" }, { value: "true", label: "Laki Laki" }]}
                                    onChange={(v) => {
                                        input.onChange(v);
                                    }}
                                    value={`${input.value === "true" || input.value === true}`}
                                />
                            )}
                        />
                    </SimpleGrid>

                    <Field
                        name="additional_info"
                        render={({ input, meta }) => (
                            <Textarea label="Informasi Tambahan" {...input} />
                        )}
                    />
                    <Field
                        name="status"
                        render={({ input, meta }) => (
                            <Select label="Jabatan" data={[{ value: "aktif", label: "Aktif" }, { value: "nonaktif", label: "Non Aktif" }]}
                                {...input}
                            />
                        )}
                    />

                    <Field
                        name="role"
                        render={({ input, meta }) => (
                            <Select label="Jabatan" data={[{ value: "kepala pengurus", label: "Kepala" }, { value: "pengurus", label: "Pengurus" }]}
                                onChange={(v) => {
                                    input.onChange(v);
                                }}
                                value={input.value}
                            />
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
