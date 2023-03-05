import * as React from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  checked: boolean;
}

function FMChip({ title, checked }: IProps) {
  return (
    <Container checked={checked}>
      <TextBox>{title}</TextBox>
    </Container>
  );
}

const Container = styled.div<{ checked: boolean }>`
  max-width: 100%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 0.8125rem;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  height: 24px;
  color: #fff;
  background-color: ${(props) =>
    props.checked ? "#E9CFDC" : props.theme.colors.main};
  border-radius: 16px;
  white-space: nowrap;
  -webkit-transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: default;
  outline: 0;
  -webkit-text-decoration: none;
  text-decoration: none;
  border: 0;
  padding: 0;
  vertical-align: middle;
  box-sizing: border-box;
`;

const TextBox = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
`;

export default React.memo(FMChip);
