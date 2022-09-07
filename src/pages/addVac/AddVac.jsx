import { useState, useEffect } from "react";
import "./Vaccination.css";
import { VacCard } from "./VacCard";
import { AddVacModal } from "./AddVacModal";
import { EditVacModal } from "./EditVacModal";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";


let source;

export const AddVac = ({ isLoggedIn, isAdmin, isAuth }) => {
  const [showAddVacForm, setShowAddVacForm] = useState(false);
  const [showEditVacForm, setShowEditVacForm] = useState(false);
  const [VacArr, setVacArr] = useState([]);
  const [selectVac, setSelectVac] = useState({});
  const [isPending, setIsPending] = useState(false);

  const getData = () => {
    setIsPending(true);
    source = axios.CancelToken.source();
    axios
      .get("https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Vacs", {
        cancelToken: source.token,
      })
      .then((response) => {
        setIsPending(false);
        setVacArr(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleShowAddVacForm = () => {
    setShowAddVacForm(true);
  };
  const handleHideAddVacForm = () => {
    setShowAddVacForm(false);
  };

  const handleShowEditVacForm = () => {
    setShowEditVacForm(true);
  };

  const handleHideEditVacForm = () => {
    setShowEditVacForm(false);
  };

  const handlSelectVac = (Vac) => {
    setSelectVac(Vac);
  };

  const deleteVac = (MyVac) => {
    if (
      window.confirm(`Ви впевнені, що хочете видалити вакцину: ${MyVac.title}?`)
    ) {
      setIsPending(true);
      axios
        .delete(`https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Vacs/${MyVac.id}`)
        .then(() => {
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewVac = (MyVac) => {
    setIsPending(true);
    axios
      .post("https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Vacs", MyVac)
      .then((response) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditVac = (updateVac) => {
    setIsPending(true);
    axios
      .put(
        `https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Vacs/${updateVac.id}`,
        updateVac
      )
      .then(() => {
        getData();
      });
  };

  const vacPosts = VacArr.map((item) => {
    return (
      <VacCard
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        deleteVac={() => deleteVac(item)}
        handleShowEditVacForm={handleShowEditVacForm}
        handlSelectVac={() => handlSelectVac(item)}
        isAdmin={isAdmin}
        isAuth={isAuth}
      />
    );
  });

  if (VacArr.length === 0)
    return (
      <div className="waitDownl">
        <h1>Завантаження даних...</h1>
      </div>
    );

  const vacOpacity = isPending ? 0.5 : 1;

  return (
    <>
      <div className="containerVac">
        {showAddVacForm && (
          <AddVacModal
            VacArr={VacArr}
            handleHideAddVacForm={handleHideAddVacForm}
            addNewVac={addNewVac}
          />
        )}
        {showEditVacForm && (
          <EditVacModal
            handleHideEditVacForm={handleHideEditVacForm}
            selectVac={selectVac}
            EditVac={EditVac}
          />
        )}
        <div className="vaccination">Ціна на вакцинацію</div>
        <div className="price" style={{ opacity: vacOpacity }}>
          <div className="vacList">
            <div
              className="vacName"
              style={{ fontWeight: "1000", color: "#000" }}
            >
              Назва вакцини
            </div>
            <div
              className="PoslugaPrice"
              style={{ fontWeight: "1000", color: "#000" }}
            >
              Ціна, грн
            </div>
          </div>
          <div className="price">{vacPosts}</div>
          {isPending && <CircularProgress className="preLoader" />}
        </div>

        {isAuth && (
          <div className="addVacButton">
            <button onClick={handleShowAddVacForm}>Додати нову вакцину</button>
          </div>
        )
        }
      </div>
    </>
  );
};
