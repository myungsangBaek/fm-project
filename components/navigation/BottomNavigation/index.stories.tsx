import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header from '.';

export default {
  title: 'UI/Navigation/BottomNavigation',
  component: Header,
  args: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => {
  return <Header />;
};

export const Default = Template.bind({});
Default.args = {};
Default.argTypes = {};
