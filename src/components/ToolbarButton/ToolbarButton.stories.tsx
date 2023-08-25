/* eslint-disable no-console */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ToolbarButtonType } from '../Toolbar/Toolbar';

import { ToolbarButton } from './ToolbarButton';

export default {
  title: 'Atoms/ToolbarButton',
  component: ToolbarButton,
  args: {
    icon: ToolbarButtonType.MapAppearance,
    onClick: () => console.info('Toolbar button clicked'),
    label: 'Map Appearance',
    showActive: false,
    active: false,
  },
} as ComponentMeta<typeof ToolbarButton>;

const Template: ComponentStory<typeof ToolbarButton> = (args) => (
  <ToolbarButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

const TemplateActive: ComponentStory<typeof ToolbarButton> = (args) => (
  <ToolbarButton {...args} />
);

export const Active = TemplateActive.bind({});
Active.args = {
  showActive: true,
  active: true,
};
