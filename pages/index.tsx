import React, { useEffect, useState } from "react";
import FMLayout from "@/components/base/FMLayout";
import NoTaskCard from "@/components/card/NoTaskCard";
import TaskCard from "@/components/card/TaskCard";

import styled from "styled-components";

import { useRecoilState } from "recoil";
import { taskState } from "@/config/store";

const TodoListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Home() {
  const [taskList, setTaskList] = useRecoilState(taskState);

  const onDeleteHandler = (id: number) => {
    console.log(id);
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const savedTaskList = localStorage.getItem("taskList");
    if (savedTaskList) {
      setTaskList(JSON.parse(savedTaskList));
    }
  }, []);
  console.log(taskList);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const renderTodoList = () => {
    return taskList.length > 0 ? (
      <TodoListContainer>
        {taskList.map((item: any) => (
          <TaskCard
            id={item.id}
            key={item.id}
            title={item.title}
            content={item.content}
            checked={item.checked}
            onDeleteHandler={onDeleteHandler}
          />
        ))}
      </TodoListContainer>
    ) : (
      <NoTaskCard />
    );
  };

  return (
    <FMLayout header bottomNavigation headerRightIcon>
      {renderTodoList()}
    </FMLayout>
  );
}
