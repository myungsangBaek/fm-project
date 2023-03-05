import * as React from "react";
import styled from "styled-components";

interface IProps {
  title: string;
}

function FMChip({ title }: IProps) {
  return <Container></Container>;
}

const Container = styled.div``;

export default React.memo(FMChip);
