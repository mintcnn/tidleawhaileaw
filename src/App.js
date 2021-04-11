import React from 'react'
import './App.scss';
import Chat from './chat'
import Map from './map'
import Clock from "react-live-clock";
import moment from "moment";
import 'moment-timezone';

const  App = () => {
  const dateFormat = "ddd DD MMM";
  var dateNow = moment().format(dateFormat);
  return (
    <div className="containner">
      <h1 className="center font-color">Tid Leaw Hai Leaw</h1>
      <div className="center box-time">
          <Clock format={"HH:mm:ss"} ticking={true} timezone={"Asia/Bangkok"} />
        
        <div classNames="font-date">{dateNow}</div>
        </div>
      <div className="flex-center">
        <Map />
      </div>
      <hr />
      <div className="center font-color">
        <h3>Tid Leaw Hai Leaw Chatbot</h3>
        <h4>Let's start chatting</h4>
      </div>
      <Chat/>
    </div>
  );
}

export default App;
