import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import styled, { useTheme } from "styled-components";
import { Chip, Stack } from "@mui/material";

import { FMLayout, FMText } from "@/components/base";
import WriteFeedInputCard from "@/components/card/WriteInputCard";
import { taskState } from "@/config/store";
import { IChip, ITodo } from "@/types";

function NewTodoPage(): React.ReactElement {
  const router = useRouter();
  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [chip, setChip] = React.useState<string>("");
  const [chipList, setChipList] = React.useState<IChip[]>([]);
  const [taskList, setTaskList] = useRecoilState(taskState);

  const theme = useTheme();

  //Chip
  const onDeleteChipHandler = (id: number) => {
    setChipList(chipList.filter((item) => item.id !== id));
  };

  const onGenerateChipHandler = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (chipList.length >= 3) {
        alert("Hashtags can be registered up to three at most.");
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
      placeholder: "Please write a title (maximum 10 characters)",
      limitLength: 10,
      limitRow: 1,
      value: title,
      onChangeValue: (value: string) => setTitle(value),
    },
    {
      label: "Content *",
      placeholder: "Please write a content (maximum 100 characters)",
      limitLength: 100,
      limitRow: 1,
      value: content,
      onChangeValue: (value: string) => setContent(value),
    },
    {
      label: "Hash Tag",
      placeholder:
        "Please write a hashtag and press Enter key. (maximum 8 characters)",
      limitLength: 8,
      limitRow: 1,
      value: chip,
      onChangeValue: (value: string) => setChip(value),
      onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
        onGenerateChipHandler(e),
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
      alert("Please enter a title.");
    } else if (!content) {
      alert("Please enter a content.");
    } else {
      addTask();
    }
  };

  //taskList 값 변경 시 localStorage 값 변경
  React.useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <PageContainer>
      <Head>
        <title>{"Add Task"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
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
        <FMText color={theme.colors.white}>{"Submit"}</FMText>
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
