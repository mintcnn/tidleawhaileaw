import React, { useEffect, useState } from 'react'

import Clock from "react-live-clock";
import moment from "moment";
import 'moment-timezone';
import WebFont from 'webfontloader';

import Chat from './chat';
// import Map from './map'
import './App.scss';
import { getSituation, getTraffy } from './service/service';


const  App = () => {
  const dateFormat = "ddd DD MMM YYYY";
  var dateNow = moment().format(dateFormat);
  const [dataSituation, setDataSituation] = useState({});
  const [dataTraffy, setDataTraffy] = useState({})
  const [date, setDate] = useState()

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
      const month = res.data['UpdateDate'].slice(3, 5)
      const day = res.data['UpdateDate'].slice(0, 2)
      const year = res.data['UpdateDate'].slice(6, 10)
      setDate(moment(month+"/"+day+"/"+year).format(dateFormat))
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
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Bangkok"} />
        
        <div className="font-date">Last Updated : {date} {dataSituation.UpdateDate?.slice(11, 16)}</div>
      </div>
        <div className="flex-row">
          <div className="box new">
              ผู้ป่วยรายใหม่วันนี้ : {dataSituation.NewConfirmed}
          </div>
          <div className="box all">
              ผู้ป่วยยืนยันสะสม : {dataSituation.Confirmed}
          </div>
        </div>
        <div className="box recovered">
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
        </div>
        <div className="box death">
          <div>
            เสียชีวิต : {dataSituation.Deaths}
          </div>
          <div>
            เสียชีวิตเพิ่ม : {dataSituation.NewDeaths}
          </div>
        </div>

      <div className="center font-color">
        <h3>Tid Leaw Hai Leaw Chatbot</h3>
        <h4>Let's start chatting</h4>
        <h4>inform your symptoms to know that you are at risk or not</h4>
      </div>
      <Chat/>
    </div>
  );
}

export default App;
