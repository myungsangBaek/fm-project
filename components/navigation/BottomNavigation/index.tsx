import React from "react";

import styled from "styled-components";

import { Icons } from "@/public/icons";
import { useRouter } from "next/router";

function BottomNavigation() {
  const router = useRouter();

  return (
    <Container>
      <NavigationButton onClick={() => router.push("/write")}>
        <Icons.SvgElement.addIcon />
      </NavigationButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 768px;
  width: 100%;
  height: 50px;
`;

const NavigationButton = styled.button`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 50px;
  background-color: white;
  border: none;
`;

export default React.memo(BottomNavigation);
