import React, { useEffect, useState } from "react";
import UserProfile from "../Components/UserProfile";
import styled from "styled-components";
import { getfoodItem } from "../Backend/apiCalls";
import { ToastFailure } from "../Components/Toast";

const Details = () => {
  const id = JSON.parse(localStorage.getItem("user"))?.UserID;
  const [food, setFood] = useState([]);

  const getItems = async () => {
    await getfoodItem(id)
      .then((res) => {
        let data = res?.data?.Data?.data;

        console.log("Called", data);
        setFood(data);
      })
      .catch((err) => {
        ToastFailure(err?.response?.data?.messsage);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Center>
        <Container>
          <UserProfile
            user={JSON.parse(localStorage.getItem("user"))}
            food={food}
          />
        </Container>
      </Center>
    </>
  );
};

export default Details;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 50vw;
  margin: 2% 0;
  background-color: #cff2e6;
`;
