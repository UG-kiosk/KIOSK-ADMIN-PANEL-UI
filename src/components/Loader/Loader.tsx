import { keyframes } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { createStyles } from '../../theme/utils';

const Loader = () => (
  <Dialog.Root open={true}>
    <Dialog.Portal>
      <Dialog.Overlay css={DialogStyles.overlay} />
      <Dialog.Content css={DialogStyles.content}>
        <div css={DialogStyles.spinner}></div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Loader;

const overlayShow = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const spin = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
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
    width: '150px',
    height: '150px',
    padding: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:focus': {
      border: 'none',
    },
    '&:focus-visible': {
      border: 'none',
      outline: 'unset',
    },
  }),
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
    position: 'fixed',
    inset: '0',
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  spinner: {
    border: '10px solid #f3f3f3',
    borderTop: '10px solid #3498db',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    animation: `${spin} 1s linear infinite`,
  },
});
