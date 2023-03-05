import * as React from "react";
import styled, { useTheme } from "styled-components";

import Header from "@/components/navigation/Header";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { MONTH_CONFIG } from "@/config";
import FMText from "../FMText";

interface IProps {
  children: React.ReactNode;
  header?: boolean;
  bottomNavigation?: boolean;
  headerRightIcon?: boolean;
  headerLeftIcon?: boolean;
  toggleSearchBox?: () => void;
}

function FMLayout({
  children,
  header,
  bottomNavigation,
  headerRightIcon,
  headerLeftIcon,
  toggleSearchBox,
}: IProps): React.ReactElement {
  const theme = useTheme();
  const currentTime = new Date();

  const today = `${
    MONTH_CONFIG[currentTime.getMonth() + 1]
  } ${currentTime.getDate()}, ${currentTime.getFullYear()}`;

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

  const clearLocalStorage = () => {
    localStorage.removeItem("taskList");
  };

  const checkMidnightAndClear = () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    if (currentTime.getTime() >= midnight.getTime()) {
      clearLocalStorage();
    }
  };

  setInterval(checkMidnightAndClear, 1000 * 60 * 60 * 24); // Run every 24 hours

  return (
    <Container>
      {header && (
        <Header
          headerRightIcon={headerRightIcon}
          headerLeftIcon={headerLeftIcon}
          toggleSearchBox={toggleSearchBox}
        />
      )}
      <RealTimeContainer>
        <FMText color={theme.colors.gray30}>{today}</FMText>
      </RealTimeContainer>
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

const RealTimeContainer = styled.div`
  display: flex;
  height: 20px;
  padding: 12px 0;
`;
