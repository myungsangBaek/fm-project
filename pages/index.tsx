import * as React from "react";
import styled, { useTheme } from "styled-components";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { FMLayout, FMSearch, FMText } from "@/components/base";
import NoTaskCard from "@/components/card/NoTaskCard";
import TaskCard from "@/components/card/TaskCard";
import { taskState } from "@/config/store";
import { ITodo } from "@/types";

export default function Home() {
  const [taskList, setTaskList] = useRecoilState(taskState);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const [alignment, setAlignment] = React.useState<string>("All");

  const theme = useTheme();

  const handleDelete = (id: number) => {
    setTaskList(taskList.filter((item) => item.id !== id));
    if (taskList.length === 1) {
      localStorage.setItem("taskList", "");
    }
  };

  const handleCheck = (id: number) => {
    const newTaskList = taskList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    setTaskList(newTaskList);
  };

  const toggleSearchBox = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchTerm("");
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    if (!newAlignment) {
      setAlignment("All");
    }
  };

  React.useEffect(() => {
    const savedTaskList = localStorage.getItem("taskList");
    if (savedTaskList) {
      setTaskList(JSON.parse(savedTaskList));
    }
  }, []);

  React.useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }, [taskList]);

  const renderTodoList = () => {
    let data: ITodo[] = [];
    if (searchTerm?.length > 0) {
      data = taskList.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      data = taskList;
    }
    switch (alignment) {
      case "Done":
        data = data.filter((item) => item.checked);
        break;
      case "Open":
        data = data.filter((item) => !item.checked);
        break;
      default:
        break;
    }
    return data.length > 0 ? (
      <TodoListContainer>
        {data.map((item: ITodo, i: number) => (
          <TaskCard
            id={item.id}
            key={i}
            title={item.title}
            content={item.content}
            checked={item.checked}
            chipList={item.chipList}
            onDeleteHandler={handleDelete}
            onCheckHandler={handleCheck}
          />
        ))}
      </TodoListContainer>
    ) : (
      <NoTaskCard />
    );
  };

  return (
    <>
      <Head>
        <title>{"Task List"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Head>
      <FMLayout
        header
        bottomNavigation
        headerRightIcon
        toggleSearchBox={toggleSearchBox}
      >
        <CountContainer>
          <FMText color={theme.colors.main} body03>
            {`${
              taskList.length -
              taskList.filter((item) => item.checked === true).length
            } Task Left`}
          </FMText>
          <ToggleButtonGroup
            color="error"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Done">Done</ToggleButton>
            <ToggleButton value="Open">Open</ToggleButton>
          </ToggleButtonGroup>
        </CountContainer>
        {isSearchOpen && (
          <FMSearch taskList={taskList} setSearchTerm={setSearchTerm} />
        )}
        {renderTodoList()}
      </FMLayout>
    </>
  );
}

const TodoListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;
