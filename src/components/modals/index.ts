import { ContextModalProps } from "@mantine/modals";
import { OrphanEditorModal } from "./OrphanEditorModal";

const modals: Record<string, React.FC<ContextModalProps<any>>> = {
    "orphan-editor": OrphanEditorModal
};

export default modals;

