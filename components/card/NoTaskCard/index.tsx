import { FMText } from "@/components/base";
import { Icons } from "@/public/icons";
import React from "react";
import styled, { useTheme } from "styled-components";

function NoTaskCard() {
  const theme = useTheme();
  return (
    <Container>
      <Icons.SvgElement.noticeIcon />
      <FMText body01 color={theme.colors.gray30}>
        {"Add a task for today!"}
      </FMText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default React.memo(NoTaskCard);
