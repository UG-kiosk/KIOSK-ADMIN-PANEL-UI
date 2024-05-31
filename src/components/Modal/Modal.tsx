import * as Dialog from '@radix-ui/react-dialog';
import { createStyles } from '../../theme/utils';
import { keyframes } from '@emotion/react';
import Button from '../Button/Button';
import { Typography } from '../Typography/Typography';
import XIcon from '../../assets/icons/XIcon';
type ModalProps = {
  onClick?: () => void;
  isOpen?: boolean;
  handleOpen?: () => void;
};

const Modal = ({ onClick, isOpen, handleOpen }: ModalProps) => (
  <Dialog.Root open={isOpen} onOpenChange={handleOpen}>
    <Dialog.Portal>
      <Dialog.Overlay css={DialogStyles.overlay} />
      <Dialog.Content css={DialogStyles.content}>
        <Dialog.Title css={{ paddingTop: 15 }}>
          <Typography weight="bold" size="3xl">
            Are you sure to delete this item?
          </Typography>
        </Dialog.Title>
        <div style={{ display: 'flex', marginTop: 15, gap: 20, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <Button className="Button green" label="Cancel" variant="secondary" />
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button className="Button green" label="Delete" variant="cancel" onClick={onClick} />
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button css={{ all: 'unset', position: 'absolute', top: 10, left: 5, cursor: 'pointer', padding: '2px 5px' }}>
            <XIcon size={20} styles={{ fill: 'white' }} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;

const overlayShow = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DialogStyles = createStyles({
  content: ({ colors }) => ({
    backgroundColor: colors.darkBlue,
    borderRadius: '6px',
    boxShadow: 'hsl(206, 22%, 7%) / 35% 0px 10px 38px -10px, hsl(206, 22%, 7%) / 20% 0px 10px 20px -15px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '450px',
    maxHeight: '85vh',
    padding: '25px',
    color: colors.white,
  }),
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
    position: 'fixed',
    inset: '0',
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});
