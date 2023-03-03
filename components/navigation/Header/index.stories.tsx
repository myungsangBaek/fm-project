import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Header, { IProps } from '.';

export default {
  title: 'UI/Navigation/Header',
  component: Header,
  args: {
    headerLeftIcon: true,
    headerRightIcon: true,
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: IProps) => {
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  headerLeftIcon: true,
  headerRightIcon: true,
};
Default.argTypes = {
  headerLeftIcon: {
    description: '왼쪽 아이콘',
    table: { type: { summary: '닫기 아이콘' }, defaultValue: { summary: '' } },
  },
  headerRightIcon: {
    description: '오른쪽 아이콘',
    table: { type: { summary: '검색 아이콘' }, defaultValue: { summary: '' } },
  },
};
