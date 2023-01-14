import { OrphanModel } from "@/routes/orphanRoute";
import { Button, Group, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";
import dayjs from "dayjs";
import { FormApi, SubmissionErrors } from "final-form";
import { Field, Form } from "react-final-form";

export const DonationEditorModal = (props: ContextModalProps<{ onClick: (values: Record<string, any>) => void; initialValues: Record<string, any>; }>) => {

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
                            name="donorName"
                            render={({ input, meta }) => (
                                <TextInput label="Nama Pendonor" {...input} />
                            )}
                        />
                        <Field
                            name="amount"
                            render={({ input, meta }) => (
                                <TextInput label="Jumlah" {...input} />
                            )}
                        />


                    </SimpleGrid>
                    <Field
                        name="optional_notes"
                        render={({ input, meta }) => (
                            <TextInput label="Catatan Tambahan" {...input} />
                        )}
                    />
                    <Field
                        name="source"
                        render={({ input, meta }) => (
                            <TextInput label="Sumber" {...input} />
                        )}
                    /> <Field
                    name="source"
                    render={({ input, meta }) => (
                        <Select label="Status" data={[{ value: "ovo", label: "OVO" }, { value: "transfer bank", label: "Transfer Bank" }, {value: "Cash", label:"Cash"}]}
                            {...input}
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
