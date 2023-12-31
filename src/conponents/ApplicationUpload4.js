import React, { useState } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Navbar from "../elements/navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import Button from "react-bootstrap/Button";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudDownload } from '@fortawesome/free-solid-svg-icons';

import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";

function ApplicationUpload4() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { fromID, fromURL3 } = location.state;

  const [name, setName] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [mail, setMail] = useState("");
  const [authority, setAuthority] = useState("");
  const [demandPurpose, setDemandPurpose] = useState("");

  const taskDocRef = doc(db, "charity", fromID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(taskDocRef, {
        "file.doc.certificate": fromURL3,
        "info.name": name,
        "info.mail": mail,
        "info.registAddress": registerAddress,
        "info.contactAddress": contactAddress,
        "info.manager.name": managerName,
        "info.manager.phone": managerPhone,
        "info.details.authority": authority,
        "info.details.demandPurpose": demandPurpose,
        // info: {
        //   name: name,
        //   mail: mail,
        //   status: "待審核",
        //   fundraisingNo: "尚未填寫",
        //   tel: "尚未填寫",
        //   registAddress: registerAddress,
        //   contactAddress: contactAddress,
        //   manager: {
        //     name: managerName,
        //     phone: managerPhone,
        //   },
        //   details: {
        //     category: "尚未填寫",
        //     concept: "尚未填寫",
        //     intro: "尚未填寫",
        //     authority: authority,
        //     demandPurpose: demandPurpose,
        //   },
        // },
        // UniqueId: uuidv4(),
      });
      navigate("/UploadSuccess");
    } catch (err) {
      alert(err);
    }
  };

  const cardStyle = {
    width: "75%",
    color: "black",
    left: "50%",
    marginTop: "100px",
    transform: `translate(${-50}%, ${-5}%)`,
    paddingTop: "5%",
    paddingBottom: "6%",
    paddingLeft: "8%",
    paddingRight: "8%",
    letterSpacing: "1px",
  };
  const pageStyle = {};
  const h4Style = {
    fontWeight: "bold",
    lineHeight: "80px",
  };
  const nameStyle = {
    lineHeight: "40px",
    marginRight: "10px",
  };
  const labelStyle = {
    height: "40px",
    borderRadius: "5px",
  };
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="公益團體申請資料填寫及上傳" color="#F4D19B" />
      <Container>
        <Stepper activeStep={3} alternativeLabel style={{ margin: "50px" }}>
          <Step key={2}>
            <StepLabel>上傳勸募許可函一份</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>上傳切結書一份</StepLabel>
          </Step>
          <Step key={4}>
            <StepLabel>上傳法人登記書一份</StepLabel>
          </Step>
          <Step key={5}>
            <StepLabel>上傳公益團體基本資料</StepLabel>
          </Step>
          <Step key={6}>
            <StepLabel>完成</StepLabel>
          </Step>
        </Stepper>
      </Container>
      <TitleStep
        color="#F58D59"
        name="STEP4&nbsp;-&nbsp;上傳公益團體基本資料"
      />
      <Card style={cardStyle}>
        <Card.Body>
          <form onSubmit={handleSubmit} name="addTask">
            <h4 style={h4Style}>四、公益團體基本資料</h4>
            <ol
              style={{
                paddingLeft: "50px",
                fontWeight: "520",
                marginTop: "8px",
              }}
              type="a"
            >
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      募捐需求物資團體全銜：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    style={labelStyle}
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    placeholder="請輸入全銜（如：財團法人董氏基金會）"
                  />
                </span>
              </InputGroup>
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      登記地址：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    style={labelStyle}
                    type="text"
                    onChange={(e) => {
                      setRegisterAddress(e.target.value);
                    }}
                    value={registerAddress}
                    placeholder="請輸入註冊地址（如：242新北市新莊區中正路510號）"
                  />
                </span>
              </InputGroup>
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      聯絡地址：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    style={labelStyle}
                    type="text"
                    onChange={(e) => {
                      setContactAddress(e.target.value);
                    }}
                    value={contactAddress}
                    placeholder="請輸入聯絡地址（如：242新北市新莊區中正路510號）"
                  />
                </span>
              </InputGroup>
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      負責人姓名：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    style={labelStyle}
                    type="text"
                    onChange={(e) => {
                      setManagerName(e.target.value);
                    }}
                    value={managerName}
                    placeholder="請輸入負責人姓名（如：王曉明）"
                  />
                </span>
              </InputGroup>
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      負責人連絡電話：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    style={labelStyle}
                    type="text"
                    onChange={(e) => {
                      setManagerPhone(e.target.value);
                    }}
                    pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}"
                    value={managerPhone}
                    placeholder="請輸入負責人連絡電話（如：02-1234-5678）"
                  />
                </span>
              </InputGroup>
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      電子信箱：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    style={labelStyle}
                    type="email"
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                    value={mail}
                    placeholder="請輸入電子信箱（如：abc12345@gmail.com）"
                  />
                </span>
              </InputGroup>
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      現行主管機關：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    style={labelStyle}
                    type="text"
                    onChange={(e) => {
                      setAuthority(e.target.value);
                    }}
                    value={authority}
                    placeholder="請輸入現行主管機關（如：臺北市政府）"
                  />
                </span>
              </InputGroup>
              <InputGroup className="mb-3">
                <span style={{ width: "35%" }}>
                  <li>
                    <Form.Label htmlFor="basic-url" style={nameStyle}>
                      募捐需求物資目的：&nbsp;
                    </Form.Label>
                  </li>
                </span>
                <span style={{ width: "65%" }}>
                  <Form.Control
                    type="textarea"
                    placeholder="請輸入募捐需求物資目的"
                    onChange={(e) => {
                      setDemandPurpose(e.target.value);
                    }}
                    value={demandPurpose}
                    style={{ height: "100px" }}
                  />
                </span>
              </InputGroup>
              {/* <FormControl label="募捐需求物資團體全銜" type="text" onChange={(e) => { setCharityName(e.target.value) }} value={charityName} />

                            <FormControl label="登記地址" type="text" onChange={(e) => { setCharityAddress(e.target.value) }} value={charityAddress} /> */}
              {/* <InputInfo label="聯絡地址" type="text" />
                                <InputInfo label="負責人姓名" />
                                <InputInfo label="負責人聯絡電話" />
                                <InputInfo label="機構電子信箱" />
                                <InputInfo label="現行主管機關" /> */}
            </ol>

            <div className="pageStyle">
              <div></div>
              <Button
                style={{
                  color: "#ffffff",
                  backgroundColor: "#F58D59",
                  borderRadius: "30px",
                  fontSize: "16px",
                  width: "120px",
                  textAlign: "center",
                  height: "35px",
                  fontWeight: "bold",
                  border: "none",
                }}
                type="submit"
              >
                確定上傳
              </Button>
              <div></div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ApplicationUpload4;
