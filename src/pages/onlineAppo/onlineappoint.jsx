import React, { useEffect, useState } from "react";

import { InfoPatients } from "./InfoPatients.jsx";
import "./appoint.css";
import axios from "axios";

const token = '5549357725:AAGhcc_cZhsP46IxdNxddJtYHLchOSiGwGQ'
const id = '-415439085'


let source;

export const Appointments = () => {
  const [dateAboutPatients, setDateAboutPatients] = useState([]);
  const [IsPending, setIsPending] = useState(false);

  const getData = () => {
    setIsPending(true);
    source = axios.CancelToken.source();
    axios
      .get("https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Patients", {
        cancelToken: source.token,
      })
      .then((response) => {
        setIsPending(false);
        setDateAboutPatients(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePat = (pat) => {
    axios
      .delete(`https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Patients/${pat}`)
      .then(() => {
        getData();
        console.log("Ok");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dat = () => {
    dateAboutPatients.map((item) => {
      const par = item.date.split("-").join("");
      let dat = new Date();
      const days = dat.toISOString().split("T")[0];
      const today = days.split("-").join("");
      if (par < today) {
        deletePat(item.id);
        console.log("del");
      }
    });
  };

  useEffect(() => {
    getData();
    // dat();
  }, []);

  function scheduleExecution(futureDate, callback) {
    // Set an intermediary timeout at every 1 hour interval, to avoid the
    // 32 bit limitation in setting the timeout delay
    var maxInterval = 60 * 60 * 1000;
    var now = new Date();

    if (futureDate - now > maxInterval) {
      // Wait for maxInterval milliseconds, but make
      // sure we don't go over the scheduled date
      setTimeout(function () {
        scheduleExecution(futureDate);
      }, Math.min(futureDate - now, maxInterval));
    } else {
      // Set final timeout
      setTimeout(callback, futureDate - now);
    }
  }
  const futureDate = new Date();
  scheduleExecution(futureDate, function () {
    dat();
  });

  //telegram bot

  

  const infoPatients = dateAboutPatients.map((item) => {
    return (
      <InfoPatients
        key={item.id}
        name={item.name}
        date={item.date}
        time={item.time}
        phone={item.phone}
        reason={item.reason}
      />
    );
  });

  return (
    <>
      <div className="containerPatients">
        <div className="titleTable">Таблиця записів</div>
        <div className="infoAppo">
          <div className="titleAppo">
            <div className="appo">Ім'я</div>
            <div className="appo" style={{ color: "#000" }}>
              Дата
            </div>
            <div className="appo" style={{ color: "#000" }}>
              Час
            </div>
            <div className="appo" style={{ color: "#000" }}>
              Телефон
            </div>
            <div className="appo" style={{ color: "#000" }}>
              Причина
            </div>
          </div>
          <div className="dataAppo">{infoPatients}</div>
        </div>
        <div className="downlAppo">
          {/* <button type="button" onClick={dat}>
            Оновити записи
          </button> */}
        </div>
      </div>
    </>
  );
};
