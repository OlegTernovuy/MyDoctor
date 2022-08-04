import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './modal.css'
import axios from 'axios'


function MyVerticallyCenteredModal(props) {

const [name, setName] = useState("")
const [date, setDate] = useState("")
const [time, setTime] = useState("")
const [phone, setPhone] = useState("")
const [reason, setReason] = useState("")


function Done() {
    alert('Ви успішно записалися на прийом')
}

const addNewPatient = (Patients) => {
  // setIsPending(true)
  axios.post('https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Patients', Patients)
      .then((response) => {
      })
      .catch((err) => {
          console.log(err);
      })
}


const handleSubmit = (e) => {
    e.preventDefault();

    try {
        const patiens = {
          name: name,
          date: date,
          time: time,
          phone: phone,
          reason: reason,
        };

        addNewPatient(patiens)
        Done()
        props.onHide()

      } catch (e) {
        console.error("Error adding document: ", e);
      }

    setName('')
    setDate('')
    setTime('')
    setPhone('')
    setReason('')
}

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className='titleModal'>
            Записатися на прийом
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
            <input className='inputName' type="text" placeholder='Ваше ФІО' value={name}  onChange={(e) => setName(e.target.value)} required/>

              <input className='inputDate' type="date" id="start" name="trip-start"
                  value="2022-07-22"
                  min="2022-07-07" max="2023-12-31"
                  placeholder='Виберіть дату'
                  value={date}  onChange={(e) => setDate(e.target.value)}
                  required
                  />

              <input className='inputTime' type="time"
                  min="09:00" max="14:30" required step='1800'
                  value={time}  onChange={(e) => setTime(e.target.value)}
                  required/>
                  <small>Кожні пів години</small>
                  
                <br/>

              <input className='inputPhone' type="number" id="phone" name="phone" placeholder='Телефон'
                  // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={phone}  onChange={(e) => setPhone(e.target.value)}
                  required/>

              <select className='reason' value={reason}  onChange={(e) => setReason(e.target.value)} required>
                  <option value="">Оберіть причину звертання</option>
                  <option value="Вакцинація">Вакцинація</option>
                  <option value="Огляд">Огляд</option>
                  <option value="Захворювання">Захворювання</option>
              </select>

            <button type='submit' className='buttonConfirm'>Записатися</button>
        </form>
        </Modal.Body>
      </Modal>
    );
  }
  
export default function CenteredModal() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="outline-info" size="lg" onClick={() => setModalShow(true)}>
            Записатися на прийом
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  