import React, { useEffect, useState } from "react";
import Head from "next/head";

import styled, { useTheme } from "styled-components";

import { FMLayout, FMText } from "@/components/base";
import WriteFeedInputCard from "@/components/card/WriteInputCard";
import { useRouter } from "next/router";
import { taskState } from "@/config/store";
import { useRecoilState } from "recoil";
import { ITodo } from "@/types";

function NewTodoPage(): React.ReactElement {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [taskList, setTaskList] = useRecoilState(taskState);

  const theme = useTheme();

  const inputCardList = [
    {
      label: "Title*",
      placeholder: "제목을 작성해주세요.(최대 10글자)",
      limitLength: 10,
      limitRow: 1,
      value: title,
      onChangeValue: (value: string) => setTitle(value),
    },
    {
      label: "Content*",
      placeholder: "내용을 작성해주세요.(최대 20글자)",
      value: content,
      limitLength: 20,
      onChangeValue: (value: string) => setContent(value),
    },
  ];

  const addTask = () => {
    const newTask: ITodo = {
      id: Date.now(),
      title: title,
      content: content,
      checked: false,
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

  useEffect(() => {
    const savedTaskList = localStorage.getItem("taskList");
    if (savedTaskList) {
      setTaskList(JSON.parse(savedTaskList));
    }
  }, []);

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
              />
            );
          })}
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

export default React.memo(NewTodoPage);
