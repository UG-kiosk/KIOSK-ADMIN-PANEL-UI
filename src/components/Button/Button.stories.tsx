import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonProperties: Story = {
  args: {
    label: 'Button label',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'cancel', 'accept'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xs', '2xs'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};
