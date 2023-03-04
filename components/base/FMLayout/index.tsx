import * as React from "react";
import styled from "styled-components";

import Header from "@/components/navigation/Header";
import BottomNavigation from "@/components/navigation/BottomNavigation";

interface IProps {
  children: React.ReactNode;
  header?: boolean;
  bottomNavigation?: boolean;
  headerRightIcon?: boolean;
  headerLeftIcon?: boolean;
}

function FMLayout({
  children,
  header,
  bottomNavigation,
  headerRightIcon,
  headerLeftIcon,
}: IProps): React.ReactElement {
  React.useEffect(() => {
    function resizeHeightForIOS() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    resizeHeightForIOS();
    window.addEventListener("resize", resizeHeightForIOS);

    return () => {
      window.addEventListener("resize", resizeHeightForIOS);
    };
  }, []);

  return (
    <Container>
      {header && (
        <Header
          headerRightIcon={headerRightIcon}
          headerLeftIcon={headerLeftIcon}
        />
      )}
      <ContentContainer>{children}</ContentContainer>
      {bottomNavigation && (
        <BottomNavigationContainer>
          <BottomNavigation />
        </BottomNavigationContainer>
      )}
    </Container>
  );
}

export default FMLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: overlay;
  box-sizing: border-box;
  max-width: 768px;
  width: 100%;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const BottomNavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  border-top: 1px solid ${(props) => props.theme.colors.gray10};
`;
