import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as RadixSelect from '@radix-ui/react-select';
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react';
import { Styles, createStyles } from '../theme/utils';
import Angledown from '../assets/Angledown';

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
      <RadixSelect.Icon asChild>
        <Angledown />
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
    <RadixSelect.Item ref={ref} {...props} css={styles}>
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
  dropdownTrigger: {},
  dropdownContent: {},
  scrollAreaRoot: {},
  scrollAreaViewport: {},
  scrollAreaScrollbar: {},
  scrollAreaThumb: {},
  fullWidthTrigger: {},
});
