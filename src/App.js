import React, { useEffect, useState } from 'react'

import Clock from "react-live-clock";
import moment from "moment";
import 'moment-timezone';
import WebFont from 'webfontloader';
import { Row, Col } from 'antd'
import 'antd/dist/antd.css'

import Chat from './chat';
// import Map from './map'
import './App.scss';
import { getSituation, getTraffy } from './service/service';


const  App = () => {
  const dateFormat = "ddd DD MMM";
  var dateNow = moment().format(dateFormat);
  const [dataSituation, setDataSituation] = useState({});
  const [dataTraffy, setDataTraffy] = useState({})

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Kanit', 'sans-serif']
      }
    })
    situation()
    // traffy()
  }, [])

  const situation = async () => {
    try {
      const res = await getSituation();
      console.log(res.data);
      setDataSituation(res.data);

    } catch (error) {
      throw error
    }
  }

  const traffy = async () => {
    try {
      const res = await getTraffy()
      console.log(res.data);
      setDataTraffy(res.data)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className="containner">
      <h1 className="center font-color">Tid Leaw Hai Leaw</h1>
      <div className="center box-time">
        {/* <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Bangkok"} /> */}
        
        <div className="font-date">{dateNow}</div>
      </div>
      <Col className="all-section">
        <Col className="flex-row">
          <Row className="section new">
              ผู้ป่วยรายใหม่วันนี้ : {dataSituation.NewConfirmed}
          </Row>
          <Row className="section all">
              ผู้ป่วยยืนยันสะสม : {dataSituation.Confirmed}
          </Row>
        </Col>
        <Col className="section recovered">
          <div>
            หายป่วยแล้ว : {dataSituation.Recovered}
          </div>
          <div>
            หายป่วยเพิ่มขึ้น : {dataSituation.NewRecovered}
          </div>
          <div>
            กำลังรักษาอยู่ : {dataSituation.Hospitalized}
          </div>
          <div>
            รักษาเพิ่มขึ้น : {dataSituation.NewHospitalized}
          </div>
        </Col>
        <Col className="section death">
          <div>
            เสียชีวิต : {dataSituation.Deaths}
          </div>
          <div>
            เสียชีวิตเพิ่ม : {dataSituation.NewDeaths}
          </div>
        </Col>
      </Col>

      {/* <div className="flex-center">
        <Map />
      </div>
      <hr /> */}
      <div className="center font-color">
        <h3>Tid Leaw Hai Leaw Chatbot</h3>
        <h4>Let's start chatting</h4>
      </div>
      <Chat/>
    </div>
  );
}

export default App;
