import React from "react";
import IntroductionPdf from "./Files/公益團體申請流程說明書.pdf";
import AffidavitLetterDocx from "./Files/機構切結書.docx";
import AffidavitLetterPdf from "./Files/機構切結書.pdf";
import "../App.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownload } from "@fortawesome/free-solid-svg-icons";

import TitleSec from "../elements/titleSec";

import Navbar from "../elements/navbar";
import Button from "../elements/button";

import NavbarHome from "../elements/navbarHome";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function ApplicationInfo() {
 

  const [user] = useAuthState(auth);
  const cardStyle = {
    transform: `translate(${-50}%, ${-5}%)`,
  };

  const btnStyle = {
    position: "absolute",
    marginTop: "30px",
    left: "50%",
    transform: `translate(${-50}%, ${-50}%)`,
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "15px",
    paddingRight: "15px",
  };
  const h4Style = {
    fontWeight: "bold",
    lineHeight: "70px",
  };
  const pStyle = {
    lineHeight: "40px",
  };
  const h5Style = {
    fontWeight: "550",
    lineHeight: "40px",
  };
  return (
    <div>
      {user && <Navbar />}
      {!user && <NavbarHome />}
      <TitleSec name="公益團體申請資料說明" color="#F4D19B" />

  
      <Card style={cardStyle} className="applicationInfoCard">
        <Card.Body>
          <h4 style={h4Style}>公益團體於中華郵政公益網上架勸募申請流程</h4>
          <p style={pStyle}>
            　　公益團體（以下簡稱機構）如要申請捐捐不息平台帳號（以下簡稱本平台）以募捐機構需求物資，請備妥下列資料，並上傳於平台之公益團體申請介面。
          </p>
          <p style={pStyle}>
            　　確實上傳並提交資料後，請等待約3~5個工作天得到審核結果，屆時審核結果將寄送至申請書上的電子信箱，故請確保電子信箱未填寫錯誤。
          </p>
          <p style={pStyle}>
            　　註：
            <span style={{ color: "red", fontWeight: "bold" }}>
              若電子信件寄送後的7天內未查收須重新申請
            </span>
            ，還請務必查收。
          </p>
          <h4 style={h4Style}>一、機構應上傳資料</h4>
          <h5 style={h5Style}>
            Step1. 上傳衛生福利部或直轄市、縣（市）政府勸募許可函一份
          </h5>
          <p style={pStyle}>
            　　檔案格式：以照片上傳，需保證照片清晰、色調正常，JPG檔、PNG檔均可。
          </p>
          <h5 style={h5Style}>Step2. 上傳切結書一份（如附件）</h5>
          <p style={pStyle}>
            　　檔案格式：word檔填寫資料，並轉檔成pdf檔上傳，
            <span style={{ color: "red", fontWeight: "bold" }}>
              請注意簽章應以正楷填寫
            </span>
            。
          </p>
          <h5 style={h5Style}>Step3. 上傳法人登記書一份</h5>
          <p style={pStyle}>
            　　檔案格式：以照片上傳，需保證照片清晰、色調正常，JPG檔、PNG檔均可。
          </p>
          <h5 style={h5Style}>
            Step4. 上傳公益團體基本資料（於平台之公益團體申請介面填寫）
          </h5>
          <ol style={{ lineHeight: "45px", paddingLeft: "50px" }} type="a">
            <li>募捐需求物資團體全銜</li>
            <li>登記地址</li>
            <li>聯絡地址</li>
            <li>負責人姓名、聯絡電話（座機號碼、手機號碼）</li>
            <li>電子信箱</li>
            <li>現行主管機關</li>
            <li>募捐需求物資目的</li>
          </ol>

          <h4 style={h4Style}>二、注意事項</h4>
          <p style={pStyle}>
            　　機構於申請募捐需求物資上架期間有違反公益勸募條例規定情形，經主管機關廢止或撤銷其勸募許可，應即函知本平台下架。有前述情形而未主動通知，本平台仍得逕行將其下架，且該機構嗣後不得再於本公司公益網上架募款。
          </p>
          <h4 style={h4Style}>三、本平台聯絡資料</h4>
          <ol style={{ lineHeight: "45px", paddingLeft: "50px" }}>
            <li>聯絡人：天主教輔仁大學資訊管理學系</li>
            <li>電話：02-2905-2666 </li>
            <li>電子信箱：FJCUIM@mail.com</li>
          </ol>
          <h4 style={h4Style}>四、附件下載</h4>
          <ul style={{ lineHeight: "45px", paddingLeft: "50px" }}>
            <li>
              <span>
                <a
                  style={{ color: "#90AACB", cursor: "pointer" }}
                  href={IntroductionPdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  公益團體申請流程說明書.pdf&nbsp;
                  <FontAwesomeIcon icon={faCloudDownload} />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a
                  style={{ color: "#90AACB", cursor: "pointer" }}
                  href={AffidavitLetterDocx}
                  target="_blank"
                  rel="noreferrer"
                >
                  機構切結書.docx&nbsp;
                  <FontAwesomeIcon icon={faCloudDownload} />
                </a>
              </span>
            </li>
            <li>
              <span>
                <a
                  style={{ color: "#90AACB", cursor: "pointer" }}
                  href={AffidavitLetterPdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  機構切結書.pdf&nbsp;
                  <FontAwesomeIcon icon={faCloudDownload} />
                </a>
              </span>
            </li>
          </ul>

          <div style={btnStyle}>
            <Button to="/applicationUpload" name="前往上傳" color="#F58D59" />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ApplicationInfo;
