import { ITodo } from "@/types";
import { Autocomplete, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import styled from "styled-components";

const useStyles = makeStyles({
  focused: {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E10078",
    },
    "&.Mui-focused .MuiInputLabel-outlined": {
      color: "#E10078",
    },
  },
});

interface IProps {
  taskList: ITodo[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function FMSearch({ taskList, setSearchTerm }: IProps) {
  const classes = useStyles();
  return (
    <SearchContainer>
      <Autocomplete
        classes={{ focused: classes.focused }}
        onChange={(_, value) => setSearchTerm(value || "")}
        options={taskList.map((option) => option.title)}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Input Title"></TextField>
        )}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  padding: 10px 20px;
`;

export default React.memo(FMSearch);
