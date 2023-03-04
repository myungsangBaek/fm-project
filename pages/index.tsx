import FMLayout from "@/components/base/FMLayout";
import TaskCard from "@/components/card/TaskCard";
import React from "react";
import styled from "styled-components";

export default function Home() {
  return (
    <FMLayout header bottomNavigation headerRightIcon>
      <TaskCard />
    </FMLayout>
  );
}

const Container = styled.div`
  border: 1px solid black;
  width: 40px;
  height: 40px;
`;
