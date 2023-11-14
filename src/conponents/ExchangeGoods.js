import { Container, Table, Form } from "react-bootstrap";
// import Form from 'react-bootstrap/Form';
// import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
// import ListGroup from "react-bootstrap/ListGroup";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import NavbarCharity from "../elements/navbarCharity";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import NavbarHome from "../elements/navbarHome";
import {
  collection,
  query,
  onSnapshot,
  where,
  select,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router";
// import { useHistory } from "react-router-dom";
import ExchangeGoodsTable from "../elements/exchangeGoodsTable";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

const ExchangeGoods = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signIn");
  }
  // const history = useHistory();
  // console.log(user.uid);
  const donPageStyle = {
    marginTop: "70px",
  };
  const nextStepStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "100px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };

  // get demand DB data
  const [details, setDetails] = useState([]);

  // get QRcode DB data
  const [tmp, setTmp] = useState([]);

  // set up exchangeList: save item.id
  const [exchangeList, setExchangeList] = useState([]); // { id: '', exchangeQuantity: '' }
  // console.log(exchangeList);

  // new item details array for upload demand DB
  // const [newDetails, setNewDetails] = useState([]);
  // const [docId, setDocId] = useState(shortUUID.generate());

  // get demand DB data
  useEffect(() => {
    // let org = JSON.parse(localStorage.getItem("orgData"));
    if (user && user.uid) {
      const q = query(collection(db, "demand"), where("uid", "==", user.uid));
      onSnapshot(q, (querySnapshot) => {
        setDetails(
          querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
          }))
        );
      });
    }
  }, [user]);

  // useEffect(() => {
  //     // let org = JSON.parse(localStorage.getItem("orgData"));
  //     if (user && user.uid) {
  //         const q = query(collection(db, "demand"), where("uid", "==", user.uid), select('name', 'price'));
  //         onSnapshot(q, (querySnapshot) => {
  //             setTmp(
  //                 querySnapshot.docs.map((doc) => ({
  //                     docId: doc.id,
  //                     ...doc.data(),
  //                 }))
  //             );
  //         });
  //     }
  // }, [user]);

  // test QRcode DB data
  useEffect(() => {
    // let org = JSON.parse(localStorage.getItem("orgData"));
    if (user && user.uid) {
      // const data= [];
      const q = query(collection(db, "QRcode"), where("uid", "==", user.uid));
      onSnapshot(q, (querySnapshot) => {
        setTmp(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        // querySnapshot.docs.map((doc) => ({
        //     data.push(doc.data());
        // }))
      });
      // setTmp(data)
    }
  }, [user]);

  // console.log(details);
  // console.log(tmp);

  // details.map((item) =>
  //     console.log(item)
  // )

  const handleCheckList = async () => {
    // alert('handleProduceQRcode');
    // const filteredDetails = details.filter((item2) =>
    //     exchangeList.some((item1) => item2.id === item1.id)
    // );

    // compare two array of objects and leave the exist id
    const filteredDetails = details.map(({ id, state, ...rest }) => rest); // remove 'id' and 'state' fields

    const mergedDetails = filteredDetails
      .map((item2) => {
        const item1 = exchangeList.find((item1) => item1.id === item2.docId);
        return item1
          ? { ...item2, exchangeQuantity: item1.exchangeQuantity }
          : null;
      })
      .filter((item) => item);

    // console.log(mergedDetails);
    navigate("/exchangeGoodsSec", { state: { mergedDetails: mergedDetails } });
  };

  return (
    <div>
      <NavbarCharity />
      <div>
        <div style={{marginTop: "-80px"}}>
          <TitleSec name="兌換物資列表" color="#90AACB" />
        </div>
        <Container>
          <Stepper
            alternativeLabel
            activeStep={0}
            style={{ margin: "30px 0px 30px 0px" }}
          >
            <Step key={2}>
              <StepLabel>選擇兌換物資</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>確認兌換資料</StepLabel>
            </Step>
            <Step key={4}>
              <StepLabel>生成兌換條碼</StepLabel>
            </Step>
          </Stepper>
          <TitleStep name="STEP1&nbsp;-&nbsp;選擇兌換物資" />
          <div style={{ textAlign: "center" }}>
            <p style={{ marginTop: "15px" }}>
              請填寫欲兌換數量，並勾選欲兌換的需求物資
            </p>
            <p style={{ color: "#e74a3b", fontWeight: "bold" }}>
              ※若無法勾選或填寫兌換數量，即代表該需求物資還未有民眾認購，故無法兌換！
            </p>
          </div>
          <Form>
            <Table
              striped
              bordered
              hover
              responsive
              className="table-rwd text-center"
            >
              <thead>
                <tr class="tr-only-hide">
                  <th scope="col">#</th>
                  <th scope="col">物資名稱</th>
                  <th scope="col">提供物資商家</th>
                  <th scope="col">物資需求狀態</th>
                  <th scope="col">需求數量</th>
                  <th scope="col">可兌換數量</th>
                  <th scope="col">已兌換數量</th>
                  <th scope="col">欲兌換數量</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item, index) => (
                  <tr
                    style={{
                      backgroundColor:
                        item.availibility <= 0 || item.state === "徵求完畢"
                          ? "#f5f5f5"
                          : "",
                    }}
                  >
                    <ExchangeGoodsTable
                      key={index}
                      id={item.docId}
                      name={item.name}
                      store={item.store}
                      state={item.state}
                      quantity={item.quantity}
                      availability={item.availability}
                      received={item.received}
                      exchangeList={exchangeList}
                      setExchangeList={setExchangeList}
                    />
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
          <div
            style={{
              marginTop: "30px",
              marginBottom: "50px",
              // marginLeft: "43%",
            }}
          >
            {/* <Link to="/exchangeGoodsSec" state={{ QRcodeId: QRcodeId }}> */}
            {exchangeList.length === 0 ? (
              <center>
                <button
                  disabled
                  style={{ ...nextStepStyle, backgroundColor: "lightgray" }}
                >
                  下一步
                </button>
              </center>
            ) : (
              <center>
                <button style={nextStepStyle} onClick={handleCheckList}>
                  下一步
                </button>
              </center>
            )}
            {/* </Link> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ExchangeGoods;
