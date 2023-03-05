import * as React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { FMLayout, FMSearch } from "@/components/base";
import NoTaskCard from "@/components/card/NoTaskCard";
import TaskCard from "@/components/card/TaskCard";
import { taskState } from "@/config/store";
import { ITodo } from "@/types";
import Head from "next/head";

export default function Home() {
  const [taskList, setTaskList] = useRecoilState(taskState);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);

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
      <Head>
        <title>{"Main Task"}</title>
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
