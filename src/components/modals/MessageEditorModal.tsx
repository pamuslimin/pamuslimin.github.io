import { OrphanModel } from "@/routes/orphanRoute";
import { Button, Group, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";
import dayjs from "dayjs";
import { FormApi, SubmissionErrors } from "final-form";
import { Field, Form } from "react-final-form";

export const MessageEditorModal = (props: ContextModalProps<{ onClick: (values: Record<string, any>) => void; initialValues: Record<string, any>; }>) => {

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
                            name="sender_name"
                            render={({ input, meta }) => (
                                <TextInput label="Pengirim" {...input} />
                            )}
                        />
                        <Field
                            name="sender_phone"
                            render={({ input, meta }) => (
                                <TextInput label="No. Telepon" {...input} />
                            )}
                        />
                        <Field
                            name="subject"
                            render={({ input, meta }) => (
                                <TextInput label="Subyek" {...input} />
                            )}
                        />
                        <Field
                            name="replied"
                            render={({ input, meta }) => (
                                <Select label="Dibalas" data={[{ value: "false", label: "Belum Dibalas" }, { value: "true", label: "Sudah Dibalas" }]}
                                    onChange={(v) => {
                                        input.onChange(v);
                                    }}
                                    value={`${input.value === "true" || input.value === true}`}
                                />
                            )}
                        />
                    </SimpleGrid> 
                    <Field
                        name="message"
                        render={({ input, meta }) => (
                            <Textarea label="Pesan" {...input} />
                        )}
                    />
                   <Field
                        name="reply"
                        render={({ input, meta }) => (
                            <Textarea label="Balasan" {...input} />
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
