import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";
import "../Pages/CategoryItems.css";
import "../Pages/Login.css";
import userIMG from "../images/user.png";

const getExpiryClassName = (expiryDate) => {
  const oneDayTime = 24 * 60 * 60 * 1000;
  let curDate = Date.now();
  let diff = (new Date(expiryDate).getTime() - curDate) / oneDayTime;
  if (diff < 3) {
    return "redDate";
  } else if (diff > 3 && diff < 14) {
    return "orangeDate";
  } else if (diff > 14 && diff < 30) {
    return "yellowDate";
  } else {
    return "greenDate";
  }
};

const UserProfile = ({ user, food }) => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab style={{ width: "50%" }}>Profile</Tab>

          <Tab style={{ width: "50%" }}>Items</Tab>
        </TabList>
        <TabPanel>
          <Center>
            <DisplayPicture src={userIMG} width={150} height={150} />
            <div className="loginContainer">
              <div className="form-contro ">
                <label className="label">User ID</label>
                <input
                  type="text"
                  name="Email"
                  placeholder="Enter Email"
                  disabled
                  value={user?.UserID}
                />
              </div>

              <div className="form-contro ">
                <label className="label">Username</label>
                <input
                  type="text"
                  name="Email"
                  placeholder="Enter Email"
                  disabled
                  value={user?.Name}
                />
              </div>
              <div className="form-contro ">
                <label className="label">Email</label>
                <input
                  type="text"
                  name="Email"
                  placeholder="Enter Email"
                  disabled
                  value={user?.Email}
                />
              </div>
              <div className="form-contro ">
                <label className="label">Gender</label>
                <input
                  type="text"
                  name="Email"
                  placeholder="Enter Email"
                  disabled
                  value={user?.Gender}
                />
              </div>
              <div className="form-contro ">
                <label className="label">Age</label>
                <input
                  type="text"
                  name="Email"
                  placeholder="Enter Email"
                  disabled
                  value={user?.Age}
                />
              </div>
              <div className="form-contro ">
                <label className="label">Items</label>
                <input
                  type="text"
                  name="Email"
                  placeholder="Enter Email"
                  disabled
                  value={food?.length}
                />
              </div>
            </div>
          </Center>
        </TabPanel>
        <TabPanel>
          <Center>
            <Heading style={{ fontWeight: 800 }}>Your Items</Heading>
            <div style={{ height: "1px", borderBottom: "1px solid black" }} />

            {food?.map((item, index) => (
              <>
                <Row key={index}>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`http://localhost:4000/${item.ImageSrc}`}
                      width={100}
                      height={100}
                      style={{ borderRadius: "50%" }}
                      alt={item.Name}
                    />
                  </div>
                  <div
                    style={{
                      flex: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",

                      overflow: "hidden",
                    }}
                  >
                    <h4
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        display: "block",

                        width: "100%",
                      }}
                    >
                      Name : {item?.Name}
                    </h4>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <p
                        style={{
                          fontSize: "1rem",
                          textAlign: "start",
                        }}
                      >
                        Expiry Date :{" "}
                        <span className={getExpiryClassName(item.ExpiryDate)}>
                          {item?.ExpiryDate}
                        </span>
                      </p>
                      <p
                        style={{
                          fontSize: "1rem",
                          textAlign: "start",
                        }}
                      >
                        Notification Date :{" "}
                        <span className={getExpiryClassName(item.NotifyDate)}>
                          {item?.NotifyDate}
                        </span>
                      </p>
                    </div>
                  </div>
                </Row>
                <Line />
              </>
            ))}
          </Center>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default UserProfile;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  width: 100%;
`;

const DisplayPicture = styled.img`
  border-radius: 50%;
`;

const Heading = styled.h1`
  font-size: 1.2rem;
  color: black;
  margin: 5px 0px;
  text-align: left;
  font-weight: 200;
`;

const Line = styled.hr`
  width: 100%;
  color: black;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-height: 150px;
`;
