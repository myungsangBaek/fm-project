import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";

import { FMText } from "@/components/base";

export interface IProps {
  label: string;
  placeholder: string;
  limitLength?: number;
  limitRow?: number;
  value: string;
  onChangeValue: (value: string) => void;
  onKeyPress?: (e: any) => void;
}

function WriteFeedInputCard({
  label,
  placeholder,
  limitLength,
  value,
  limitRow,
  onChangeValue,
  onKeyPress,
}: IProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const baseRowHeight = placeholder.split(`\n`).length * 1.5 + 2;
  const valueRowHeight = value.split(`\n`).length * 1.5 + 2;

  const inputBarHeight =
    valueRowHeight > baseRowHeight ? valueRowHeight : baseRowHeight;

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (limitRow && e.target.value.split(`\n`).length > limitRow)
      onChangeValue(e.target.value.slice(0, -1));
    else onChangeValue(e.target.value);
  }, []);

  return (
    <Container>
      <FMText body03 color={isFocus ? "#E00178" : "#000000"}>
        {label}
      </FMText>
      <InputBar
        placeholder={placeholder}
        value={value}
        rows={1}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onKeyPress={onKeyPress}
        maxLength={limitLength}
        height={`${inputBarHeight}rem`}
      />
      <LimitTextContainer>
        {limitLength && (
          <FMText caption02 color={"#8F8D8B"}>
            {`${value.length}/`}
            <HighlightText>{limitLength}</HighlightText>
          </FMText>
        )}
      </LimitTextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
`;

const InputBar = styled.textarea<{ height: string }>`
  width: 100%;
  box-sizing: border-box;
  margin: 12px 0px;
  padding: 16px;
  border: 0px;
  overflow: auto;
  height: ${({ height }) => height};
  caret-color: ${(props) => props.theme.colors.main};
  border-top: 1px solid ${(props) => props.theme.colors.gray10};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray10};
  resize: none;
  line-height: 1.5rem;
  ::placeholder {
    color: ${(props) => props.theme.colors.gray30};
  }
  &:focus {
    outline: none;
    border-top: 1px solid ${(props) => props.theme.colors.main};
    border-bottom: 1px solid ${(props) => props.theme.colors.main};
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const LimitTextContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const HighlightText = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.main};
`;

export default React.memo(WriteFeedInputCard);
