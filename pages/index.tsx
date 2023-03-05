import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import FMLayout from "@/components/base/FMLayout";
import NoTaskCard from "@/components/card/NoTaskCard";
import TaskCard from "@/components/card/TaskCard";

import { taskState } from "@/config/store";
import { ITodo } from "@/types";

const TodoListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Home() {
  const [taskList, setTaskList] = useRecoilState(taskState);

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
    return taskList.length > 0 ? (
      <TodoListContainer>
        {taskList.map((item: ITodo) => (
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

  return (
    <FMLayout header bottomNavigation headerRightIcon>
      {renderTodoList()}
    </FMLayout>
  );
}
