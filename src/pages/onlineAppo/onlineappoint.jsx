import React, {useEffect, useState} from 'react'

import { InfoPatients } from './InfoPatients.jsx';
import './appoint.css'
import axios from 'axios'


let source;

export const Appointments = () => {
    const [dateAboutPatients, setDateAboutPatients] = useState([])
    const [IsPending, setIsPending] = useState(false)

    const getData = () => {
        setIsPending(true)
        source = axios.CancelToken.source();
        axios.get('https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Patients', { cancelToken: source.token })
        .then((response) => {
            setIsPending(false)
            setDateAboutPatients(response.data)            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const deletePat = (pat) => {
            axios.delete(`https://62e3d9aa3c89b95396d1ebbd.mockapi.io/Patients/${pat}`)
                .then(() => {
                    getData();
                })
                . catch((err) => {
                    console.log(err);
                })
}

    const dat = () => {
        dateAboutPatients.map((item) => {
            const par = item.date.split('-').join('')
            let dat = new Date()
            const days =  dat.toISOString().split('T')[0];
            const today = days.split('-').join('')
            if(par < today) {
                deletePat(item.id)
                console.log('rf');
            } 
        })
    }

    useEffect(() => {
        getData();      
    }, [])

          const infoPatients = dateAboutPatients.map((item) => {
            return(
                <InfoPatients
                key={item.id}
                    name= {item.name}
                    date= {item.date}
                    time= {item.time}
                    phone= {item.phone}
                    reason= {item.reason}
                />
            )
        })

        return(
            <>
            <div className='containerPatients'>
                <div className='titleTable'>Таблиця записів</div>
                <div className='infoAppo'>
                    <div className='titleAppo'>
                        <div className='appo'>Ім'я</div>
                        <div className='appo' style={{ color: '#000'}}>Дата</div>
                        <div className='appo' style={{ color: '#000'}}>Час</div>
                        <div className='appo' style={{ color: '#000'}}>Телефон</div>
                        <div className='appo' style={{ color: '#000'}}>Причина</div>
                    </div>
                    <div className='dataAppo'>
                        {infoPatients}
                    </div>
                </div>
                <div className='downlAppo'>
                    <button type='button' onClick={dat}>Оновити записи</button>
                </div>
            </div>
            </>
        )
}