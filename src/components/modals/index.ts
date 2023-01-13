import { ContextModalProps } from "@mantine/modals";
import { BlogEditorModal } from "./BlogEditorModal";
import { DonationEditorModal } from "./DonationEditorModal";
import { ExpensesEditorModal } from "./ExpensesEditorModal";
import { ManagementEditorModal } from "./ManagementEditorModal";
import { MessageEditorModal } from "./MessageEditorModal";
import { OrphanEditorModal } from "./OrphanEditorModal";

const modals: Record<string, React.FC<ContextModalProps<any>>> = {
    "orphan-editor": OrphanEditorModal,
    "management-editor": ManagementEditorModal,
    "expenses-editor": ExpensesEditorModal,
    "donation-editor": DonationEditorModal,
    "blog-editor": BlogEditorModal,
    "message-editor": MessageEditorModal,
};

export default modals;

