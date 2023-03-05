import { ITodo } from "@/types";
import { atom } from "recoil";

const taskState = atom<ITodo[]>({
  key: "taskKey",
  default: [],
});

export { taskState };
