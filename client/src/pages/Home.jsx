import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setBoards } from "../redux/features/boardSlice";
import { useNavigate } from "react-router-dom";
import boardApi from "../api/boardApi";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createBoard = async () => { //1
    setLoading(true);  //2
    try {  //3
      const res = await boardApi.create();  
      dispatch(setBoards([res])); //3
      navigate(`/boards/${res.id}`); //4
    } catch (err) { 
      alert(err); //6
    } finally {
      setLoading(false);  //7
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={createBoard}
        loading={loading}
      >
        Da click aqui para crear tu primer tablero
      </LoadingButton>
    </Box>
  );
};

export default Home;
