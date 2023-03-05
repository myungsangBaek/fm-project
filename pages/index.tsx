import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import FMLayout from "@/components/base/FMLayout";
import NoTaskCard from "@/components/card/NoTaskCard";
import TaskCard from "@/components/card/TaskCard";

import { taskState } from "@/config/store";
import { ITodo } from "@/types";
import { Autocomplete, TextField } from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  focused: {
    color: "purple",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E10078",
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
      color: "#E10078",
    },
  },
});

export default function Home() {
  const [taskList, setTaskList] = useRecoilState(taskState);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [isSearch, setIsSearch] = useState<boolean>(false);

  const onDeleteHandler = (id: number) => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  const onCheckHandler = (id: number) => {
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

  const openSearchBoxHandler = () => {
    setIsSearch(!isSearch);

    setSearchTerm("");
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

  const renderTodoList = () => {
    const data =
      searchTerm?.length > 0
        ? taskList.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : taskList;
    return data.length > 0 ? (
      <TodoListContainer>
        {data.map((item: ITodo) => (
          <TaskCard
            id={item.id}
            key={item.id}
            title={item.title}
            content={item.content}
            checked={item.checked}
            chipList={item.chipList}
            onDeleteHandler={onDeleteHandler}
            onCheckHandler={onCheckHandler}
          />
        ))}
      </TodoListContainer>
    ) : (
      <NoTaskCard />
    );
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <FMLayout
        header
        bottomNavigation
        headerRightIcon
        openSearchBoxHandler={openSearchBoxHandler}
      >
        {isSearch && (
          <SearchContainer>
            <Autocomplete
              onChange={(_, value) => setSearchTerm(value || "")}
              options={taskList.map((option) => option.title)}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Input Title"></TextField>
              )}
              classes={classes}
            />
          </SearchContainer>
        )}
        {renderTodoList()}
      </FMLayout>
    </React.Fragment>
  );
}

const TodoListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  margin: 20px 0;
  padding: 0 20px;
`;
