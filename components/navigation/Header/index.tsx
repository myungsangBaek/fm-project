import * as React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Icons } from "@/public/icons";
import { FMText } from "@/components/base";

export interface IProps {
  headerLeftIcon?: boolean;
  headerRightIcon?: boolean;
  toggleSearchBox?: () => void;
}

function Header({ headerRightIcon, headerLeftIcon, toggleSearchBox }: IProps) {
  const router = useRouter();
  return (
    <Container>
      <ContentContainer>
        <IconContainer onClick={() => router.back()}>
          {headerLeftIcon && <Icons.SvgElement.closeIcon />}
        </IconContainer>
        <FMText body01 color={"#E10078"}>
          {"FM TODO"}
        </FMText>
        <IconContainer onClick={toggleSearchBox}>
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
  border-bottom: 1px solid ${(props) => props.theme.colors.gray10};
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

export default React.memo(Header);
