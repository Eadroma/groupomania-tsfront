import { modalUnstyledClasses } from "@mui/material";

const fetchDataWithID = async (id: string) => {
    const api =  `https://groupomania-myback.herokuapp.com/api/auth/${id}`;
  
    const response = await fetch(api, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json"
      },
    });
    const result = await response.json();
    return result;
  }

  const getPostsbyId = async (id: string) => {
    const apiUrl = `https://groupomania-myback.herokuapp.com/api/posts/user/${id}`;
    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
        },
    };
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    return result.reverse();
  };
export {fetchDataWithID, getPostsbyId}