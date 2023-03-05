import React, { useEffect, useState } from "react";
import Head from "next/head";

import styled, { useTheme } from "styled-components";

import { FMLayout, FMText } from "@/components/base";
import WriteFeedInputCard from "@/components/card/WriteInputCard";
import { useRouter } from "next/router";
import { taskState } from "@/config/store";
import { useRecoilState } from "recoil";
import { IChip, ITodo } from "@/types";
import { Chip, Stack } from "@mui/material";

function NewTodoPage(): React.ReactElement {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [chip, setChip] = useState<string>("");
  const [chipList, setChipList] = useState<IChip[]>([]);
  const [taskList, setTaskList] = useRecoilState(taskState);

  const theme = useTheme();

  //Chip
  const onDeleteChipHandler = (id: any) => {
    setChipList(chipList.filter((item) => item.id !== id));
  };

  const onGenerateChipHandler = (e: any) => {
    if (e.key === "Enter") {
      if (chipList.length >= 3) {
        alert("Hash Tag는 최대 3개까지 등록 가능합니다.");
      } else {
        setChipList([...chipList, { id: chipList.length + 1, title: chip }]);
      }
      setChip("");
    }
  };

  //Input 관련
  const inputCardList = [
    {
      label: "Title *",
      placeholder: "제목을 작성해주세요.(최대 10글자)",
      limitLength: 10,
      limitRow: 1,
      value: title,
      onChangeValue: (value: string) => setTitle(value),
    },
    {
      label: "Content *",
      placeholder: "내용을 작성해주세요.(최대 100글자)",
      limitLength: 100,
      limitRow: 1,
      value: content,
      onChangeValue: (value: string) => setContent(value),
    },
    {
      label: "Hash Tag",
      placeholder: "해시태그를 작성 후 Enter키를 눌러주세요.(최대 8글자)",
      limitLength: 8,
      limitRow: 1,
      value: chip,
      onChangeValue: (value: string) => setChip(value),
      onKeyPress: (e: any) => onGenerateChipHandler(e),
    },
  ];

  //localStorage 저장
  const addTask = () => {
    const newTask: ITodo = {
      id: Date.now(),
      title: title,
      content: content,
      checked: false,
      chipList: chipList,
    };
    setTaskList([...taskList, newTask]);
    setTitle("");
    setContent("");
    router.push("/");
  };

  const onSubmitHandler = () => {
    if (!title) {
      alert("제목을 입력해주세요.");
    } else if (!content) {
      alert("내용을 입력해주세요.");
    } else {
      addTask();
    }
  };

  //taskList 값 변경 시 localStorage 값 변경
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <PageContainer>
      <Head>
        <title>{"Add Task"}</title>
      </Head>
      <FMLayout header headerLeftIcon>
        <Container>
          {inputCardList.map((item, idx) => {
            return (
              <WriteFeedInputCard
                key={`${item.label}-${idx}`}
                label={item.label}
                placeholder={item.placeholder}
                limitLength={item.limitLength}
                value={item.value}
                limitRow={item.limitRow}
                onChangeValue={item.onChangeValue}
                onKeyPress={item.onKeyPress}
              />
            );
          })}
          <Stack direction="row" spacing={1}>
            {chipList.map((item, i) => (
              <Chip
                key={item.id}
                label={item.title}
                variant={"outlined"}
                onDelete={() => onDeleteChipHandler(item.id)}
              />
            ))}
          </Stack>
        </Container>
      </FMLayout>
      <SubmitButton onClick={onSubmitHandler}>
        <FMText color={theme.colors.white}>{"작성하기"}</FMText>
      </SubmitButton>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  max-width: 768px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 16px;
  border: none;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.main};
`;

const ChipContainer = styled.div`
  display: flex;
  height: 20xp;
  border: 1px solid black;
`;

export default React.memo(NewTodoPage);
