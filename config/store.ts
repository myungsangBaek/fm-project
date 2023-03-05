import { ITodo } from "@/types";
import { atom } from "recoil";

const taskState = atom<ITodo[]>({
  key: "task",
  default: [],
});

export { taskState };
