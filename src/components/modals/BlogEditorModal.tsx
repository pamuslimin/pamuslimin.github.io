import { OrphanModel } from "@/routes/orphanRoute";
import { Button, Group, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { ContextModalProps } from "@mantine/modals";
import dayjs from "dayjs";
import { FormApi, SubmissionErrors } from "final-form";
import { Field, Form } from "react-final-form";

export const BlogEditorModal = (props: ContextModalProps<{ onClick: (values: Record<string, any>) => void; initialValues: Record<string, any>; }>) => {

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
                            name="title"
                            render={({ input, meta }) => (
                                <TextInput label="Judul" {...input} />
                            )}
                        />

                    </SimpleGrid>

                    <Field
                        name="content"
                        render={({ input, meta }) => (
                            <Textarea label="Konten" {...input} />
                        )}
                    />

                    <Field
                        name="status"
                        render={({ input, meta }) => (
                            <Select label="Status" data={[{ value: "published", label: "Dipublikasi" }, { value: "draft", label: "Draft" }]}
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
