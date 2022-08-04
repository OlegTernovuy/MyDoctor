// import React, {Component} from 'react'
import { useState, useEffect } from "react";
import "./AddPrice.css";
import { PriceCard } from "./PriceCard";
import { AddPriceModal } from "./AddPriceModal";
import { EditPriceModal } from "./EditPriceModal";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

let source;

export const AddPrice = ({ isAdmin }) => {
  const [showAddPriceForm, setShowAddPriceForm] = useState(false);
  const [showEditPriceForm, setShowEditPriceForm] = useState(false);
  const [PriceArr, setPriceArr] = useState([]);
  const [selectPrice, setSelectPrice] = useState({});
  const [isPending, setIsPending] = useState(false);

  const getData = () => {
    setIsPending(true);
    source = axios.CancelToken.source();
    axios
      .get("https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Price", {
        cancelToken: source.token,
      })
      .then((response) => {
        setIsPending(false);
        setPriceArr(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleShowAddPriceForm = () => {
    setShowAddPriceForm(true);
  };
  const handleHideAddPriceForm = () => {
    setShowAddPriceForm(false);
  };

  const handleShowEditPriceForm = () => {
    setShowEditPriceForm(true);
  };

  const handleHideEditPriceForm = () => {
    setShowEditPriceForm(false);
  };

  const handlSelectPrice = (Price) => {
    setSelectPrice(Price);
  };

  const deletePrice = (MyPrice) => {
    if (
      window.confirm(
        `Ви впевнені, що хочете видалити послугу: ${MyPrice.title}?`
      )
    ) {
      setIsPending(true);
      axios
        .delete(
          `https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Price/${MyPrice.id}`
        )
        .then(() => {
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewPrice = (MyPrice) => {
    setIsPending(true);
    axios
      .post("https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Price", MyPrice)
      .then((response) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditPrice = (updatePrice) => {
    setIsPending(true);
    axios
      .put(
        `https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Price/${updatePrice.id}`,
        updatePrice
      )
      .then(() => {
        getData();
      });
  };

  const pricePosts = PriceArr.map((item) => {
    return (
      <PriceCard
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        deletePrice={() => deletePrice(item)}
        handleShowEditPriceForm={handleShowEditPriceForm}
        handlSelectPrice={() => handlSelectPrice(item)}
        isAdmin={isAdmin}
      />
    );
  });

  if (PriceArr.length === 0)
    return (
      <div className="waitDownl">
        <h1>Завантаження даних...</h1>
      </div>
    );

  const vacOpacity = isPending ? 0.5 : 1;

  return (
    <>
      <div className="containerVac">
        {showAddPriceForm && (
          <AddPriceModal
            PriceArr={PriceArr}
            handleHideAddPriceForm={handleHideAddPriceForm}
            addNewPrice={addNewPrice}
          />
        )}
        {showEditPriceForm && (
          <EditPriceModal
            handleHideEditPriceForm={handleHideEditPriceForm}
            selectPrice={selectPrice}
            EditPrice={EditPrice}
            // deletePrice = {this.deletePrice}
          />
        )}
        <div className="vaccination">Ціна на послуги</div>
        <div className="price" style={{ opacity: vacOpacity }}>
          <div className="vacList">
            <div
              className="vacName"
              style={{ fontWeight: "1000", color: "#000" }}
            >
              Назва послуги
            </div>
            <div
              className="PoslugaPrice"
              style={{ fontWeight: "1000", color: "#000" }}
            >
              Ціна, грн
            </div>
          </div>
          <div className="price">{pricePosts}</div>
          {isPending && <CircularProgress className="preLoader" />}
        </div>

        {isAdmin && (
          <div className="addVacButton">
            <button onClick={handleShowAddPriceForm}>
              Додати нову послугу
            </button>
          </div>
        )}
      </div>
    </>
  );
};
