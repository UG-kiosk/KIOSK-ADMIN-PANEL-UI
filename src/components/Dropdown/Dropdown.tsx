import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as RadixSelect from '@radix-ui/react-select';
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react';
import { Styles, createStyles } from '../../theme/utils';
import Angledown from '../../assets/icons/Angledown';

export type DropdownOption = {
  value: string;
  label: string;
  secondText?: string;
};

const Dropdown = ({ children, ...props }: RadixSelect.SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOpen = () => setIsOpen(isOpen => !isOpen);

  return (
    <RadixSelect.Root open={isOpen} onOpenChange={handleSelectOpen} {...props}>
      {children}
    </RadixSelect.Root>
  );
};

type TriggerProps = ComponentPropsWithoutRef<typeof RadixSelect.Trigger> & {
  dataTestId?: string;
  styles?: Styles;
};

const DropdownTrigger = forwardRef<ElementRef<typeof RadixSelect.Trigger>, TriggerProps>(
  ({ children, styles, dataTestId, ...props }, ref) => (
    <RadixSelect.Trigger ref={ref} css={[dropdownStyles.dropdownTrigger, styles]} data-testid={dataTestId} {...props}>
      {children}
      <RadixSelect.Icon asChild className="expand-icon">
        <Angledown size={30} />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  ),
);

type ContentProps = ComponentPropsWithoutRef<typeof RadixSelect.Content> & {
  styles?: Styles;
};

const DropdownContent = forwardRef<ElementRef<typeof RadixSelect.Content>, ContentProps>(
  ({ children, position = 'popper', styles, ...props }, ref) => (
    <RadixSelect.Portal>
      <RadixSelect.Content ref={ref} position={position} {...props} css={[dropdownStyles.dropdownContent, styles]}>
        <ScrollArea.Root css={dropdownStyles.scrollAreaRoot} type="auto">
          <RadixSelect.Viewport asChild style={{ overflowY: undefined }}>
            <ScrollArea.Viewport css={dropdownStyles.scrollAreaViewport}>{children}</ScrollArea.Viewport>
          </RadixSelect.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" css={dropdownStyles.scrollAreaScrollbar}>
            <ScrollArea.Thumb css={[dropdownStyles.scrollAreaThumb]} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  ),
);

type ItemProps = ComponentPropsWithoutRef<typeof RadixSelect.Item> & {
  styles?: Styles;
};

const DropDownItem = forwardRef<ElementRef<typeof RadixSelect.Item>, ItemProps>(
  ({ children, styles, ...props }, ref) => (
    <RadixSelect.Item ref={ref} {...props} css={[dropdownStyles.DropDownItem, styles]}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  ),
);

Dropdown.displayName = RadixSelect.Item.displayName;
Dropdown.Content = DropdownContent;
Dropdown.Group = RadixSelect.Group;
Dropdown.Item = DropDownItem;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Value = RadixSelect.Value;
DropdownTrigger.displayName = RadixSelect.Trigger.displayName;
DropdownContent.displayName = RadixSelect.Content.displayName;

export default Dropdown;

// Add styles
const dropdownStyles = createStyles({
  dropdownTrigger: ({ colors, typography }) => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: 12,
    color: colors.dark,
    backgroundColor: colors.white,
    border: `1.5px solid ${colors.background}`,
    borderRadius: 4,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.normal,
    lineHeight: 1,
    outline: 'none',
    cursor: 'pointer',
    pointerEvents: 'all',
    transition: 'border-bottom-color 300ms ease-in-out',
    '&[data-state=open]': {
      borderBottomColor: colors.lightGray,
    },
    '&[data-state=open] .select-icon': {
      transform: 'translateY(-1px) rotate(180deg)',
    },
    '&:hover': {
      backgroundColor: colors.light,
    },
    ['> span:first-of-type']: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    // style icon child
    svg: {
      color: colors.softGreen,
    },
  }),
  DropDownItem: ({ colors, typography }) => ({
    position: 'relative',
    padding: '12px 12px 12px 9px',
    color: colors.dark,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.normal,
    lineHeight: 1,
    outline: 'none',
    userSelect: 'none',
    '&[data-highlighted]': {
      outline: 'none',
      backgroundColor: colors.whiteSmoke,
      cursor: 'pointer',
    },
    '&[data-state="checked"]': {
      outline: 'none',
      backgroundColor: colors.whiteSmoke,
      fontWeight: typography.fontWeight.bold,
    },
    '&:first-of-type': {
      borderRadius: '4px 4px 0 0',
    },
    '&:last-of-type': {
      borderRadius: '0 0 4px 4px',
    },
  }),
  dropdownContent: ({ colors }) => ({
    borderRadius: 4,
    margin: '5px auto',
    backgroundColor: colors.light,
    border: `1px solid ${colors.whiteSmoke}`,
    width: 'min-content',
  }),
  scrollAreaRoot: ({ colors }) => ({
    width: '100%',
    height: '100%',
    borderRadius: 4,
    overflow: 'none',
    backgroundColor: colors.white,
  }),
  scrollAreaViewport: {
    width: '100%',
    height: '100%',
    maxHeight: 400,
  },
  scrollAreaScrollbar: ({ colors }) => ({
    display: 'flex',
    padding: '1px 2px 1px 2px',
    background: colors.lightGray,
    '&[data-orientation="vertical"]': {
      width: 10,
    },
  }),
  scrollAreaThumb: ({ colors }) => ({
    flex: 1,
    borderRadius: 5,
    position: 'relative',
    background: colors.whiteSmoke,
  }),
  fullWidthTrigger: {
    width: '100%',
  },
});
