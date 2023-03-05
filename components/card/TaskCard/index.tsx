import * as React from "react";
import styled, { useTheme } from "styled-components";
import { Stack } from "@mui/material";

import { FMText, FMChip } from "@/components/base";
import { Icons } from "@/public/icons";
import { IChip } from "@/types";

interface IProps {
  id: number;
  title: string;
  content: string;
  checked: boolean;
  chipList?: IChip[];
  onDeleteHandler: (id: number) => void;
  onCheckHandler: (id: number) => void;
}

function TaskCard({
  id,
  title,
  content,
  checked,
  chipList,
  onDeleteHandler,
  onCheckHandler,
}: IProps) {
  const theme = useTheme();
  return (
    <Container>
      <ContentContainer>
        <CheckContainer onClick={() => onCheckHandler(id)}>
          {checked ? (
            <Icons.SvgElement.checkIcon />
          ) : (
            <Icons.SvgElement.circleIcon />
          )}
        </CheckContainer>
        <TextContainer>
          <FMText
            body01
            color={checked ? theme.colors.gray10 : theme.colors.black}
          >
            {title}
          </FMText>
          <FMText
            body04
            color={checked ? theme.colors.gray10 : theme.colors.gray40}
          >
            {content}
          </FMText>
        </TextContainer>
        <IconContainer onClick={() => onDeleteHandler(id)}>
          <Icons.SvgElement.closeIcon />
        </IconContainer>
      </ContentContainer>
      <ChipContainer>
        <Stack direction="row" spacing={1}>
          {chipList?.map((item) => (
            <FMChip key={item.id} title={item.title} checked={checked} />
          ))}
        </Stack>
      </ChipContainer>
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
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${(props) => props.theme.colors.gray10};
  padding: 6px 20px;
  box-sizing: border-box;
  min-height: 36px;
`;

export default React.memo(TaskCard);
