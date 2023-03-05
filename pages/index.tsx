import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import FMLayout from "@/components/base/FMLayout";
import NoTaskCard from "@/components/card/NoTaskCard";
import TaskCard from "@/components/card/TaskCard";

import { taskState } from "@/config/store";
import { ITodo } from "@/types";

import FMSearch from "@/components/base/FMSearch";

export default function Home() {
  const [taskList, setTaskList] = useRecoilState(taskState);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    setTaskList(taskList.filter((item) => item.id !== id));
    if (taskList.length === 1) {
      console.log("4");
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

  useEffect(() => {
    const savedTaskList = localStorage.getItem("taskList");
    if (savedTaskList) {
      setTaskList(JSON.parse(savedTaskList));
    }
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
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
    <React.Fragment>
      <FMLayout
        header
        bottomNavigation
        headerRightIcon
        toggleSearchBox={toggleSearchBox}
      >
        {isSearchOpen && (
          <FMSearch taskList={taskList} setSearchTerm={setSearchTerm} />
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
