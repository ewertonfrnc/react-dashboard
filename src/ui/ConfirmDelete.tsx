import Button from './Button';
import Heading from './Heading';

type ConfirmDeleteProps = {
  resourceName: string;
  disabled?: boolean;
  onConfirm?: VoidFunction;
  onCloseModal?: VoidFunction;
};
function ConfirmDelete({
  resourceName,
  disabled,
  onConfirm,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <div className="mb-3 flex w-lg flex-col gap-3 text-gray-500">
      <Heading level="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
