import { FMText } from "@/components/base";
import { Icons } from "@/public/icons";
import React from "react";
import styled from "styled-components";

interface IProps {
  id: number;
  title: string;
  content: string;
  checked: boolean;
  chip?: string[];
  onDeleteHandler: (id: number) => void;
}

function TaskCard({
  id,
  title,
  content,
  checked,
  chip,
  onDeleteHandler,
}: IProps) {
  return (
    <Container>
      <ContentContainer>
        <CheckContainer>
          {checked ? (
            <Icons.SvgElement.checkIcon />
          ) : (
            <Icons.SvgElement.circleIcon />
          )}
        </CheckContainer>
        <TextContainer>
          <FMText body01>{title}</FMText>
          <FMText body04>{content}</FMText>
        </TextContainer>
        <IconContainer onClick={() => onDeleteHandler(id)}>
          <Icons.SvgElement.closeIcon />
        </IconContainer>
      </ContentContainer>
      <ChipContainer></ChipContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 116px;
  box-sizing: border-box;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray30};
`;

const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const CheckContainer = styled.div`
  width: 24px;
  height: 24px;
  margin: auto 0;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-top: 20px;
  cursor: pointer;
`;
const ChipContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.gray10};
  height: 36px;
`;

export default React.memo(TaskCard);
