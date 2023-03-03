import React from "react";
import styled from "styled-components";
import { Icons } from "@/public/icons";
import { FMText } from "@/components/base";

export interface IProps {
  headerRightIcon?: boolean;
}

function Header({ headerRightIcon }: IProps) {
  return (
    <Container>
      <ContentContainer>
        <TextContainer>
          <FMText body01>{"FM TODO"}</FMText>
        </TextContainer>
        <IconContainer>
          {headerRightIcon && <Icons.SvgElement.searchIcon />}
        </IconContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 768px;
  width: 100%;
  height: 44px;
  padding: 0px 24px;
  box-sizing: border-box;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default React.memo(Header);
