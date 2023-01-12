import { OrphanModel } from "@/routes/orphanRoute";
import { Button, Group, NumberInput, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";
import dayjs from "dayjs";
import { FormApi, SubmissionErrors } from "final-form";
import { Field, Form } from "react-final-form";

export const ExpensesEditorModal = (props: ContextModalProps<{ onClick: (values: Record<string, any>) => void; initialValues: Record<string, any>; }>) => {

    const { context, id, innerProps } = props;
    return (<>
        <Form onSubmit={
            function (values: Record<string,any>): void | SubmissionErrors | Promise<SubmissionErrors> {
                innerProps.onClick?.(values);
                context.closeModal(id);
            }}
            initialValues={innerProps.initialValues}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <SimpleGrid cols={2}>
                        <Field
                            name="amount"
                            render={({ input, meta }) => (
                                <NumberInput label="Jumlah" onChange={(v)=> input.onChange(v)} value={+input.value} />
                            )}
                        /> 
                        <Field
                            name="date"
                            render={({ input, meta }) => (
                                <DatePicker label="Tanggal Pengeluaran" onChange={(v) => {
                                    input.onChange(dayjs(v).format("YYYY-MM-DD"));
                                }}
                                    value={dayjs(input.value).toDate()} />
                            )}
                        />

                    </SimpleGrid>

                    <Field
                        name="description"
                        render={({ input, meta }) => (
                            <Textarea label="Deskripsi" {...input} />
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
