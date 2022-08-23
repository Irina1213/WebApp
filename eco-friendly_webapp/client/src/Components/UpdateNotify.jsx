import React, { useState } from 'react'
import "../Pages/CategoryItems.css";
import DatepickerNoForm from './DatepickerNoForm';
import format from "date-format";
import { updateFoodItem } from '../Backend/apiCalls';
import { ToastFailure, ToastSuccess } from './Toast';
import { useEffect } from 'react';


const UpdateNotify = ({item}) => {
    const [value,setValue]=useState(new Date());
    const [notify,setNotify]=useState();

    const ChangeDate = (v) => {
        const expiry = format(v, "yyyy-mm-dd").split("T")[0];
        setNotify(expiry);
        setValue(v);
      };
    

      const startingDate=()=>{
        return format(new Date(), "yyyy-mm-dd").split("T")[0];
      }
      const submitData= async ()=>{

        const id=item.FoodItemID;
        let everything=item;
        everything.NotifyDate=notify;
        // delete everything.FoodItemID;
        console.log((everything));
        console.log("Item",id);

      await  updateFoodItem(id,(everything)).then((data)=>{
        ToastSuccess("Noify Date Updated");
      }).catch((err)=>{
        ToastFailure(err.response.data);
      })
      }


      useEffect(()=>{
setNotify(startingDate());
      },[])
  return (
    <>
    <div style={{padding:50, height:'100%',display:'flex',flexDirection:"column", justifyContent:"space-around",flex:1}}>
        <h2> Pick a new Date for Notification</h2>
      <DatepickerNoForm
                name="cDate"
                selected={value}
                onChange={ChangeDate}
                title={"Pick date"}
                touched={false}
                onClose={()=>console.log("Nothing")}
             
              />
               <button
                      className="deleteBtn"
                      style={{backgroundColor:"green"}}
                      onClick={() => {
                      submitData();
                      }}
                    >
                      Update
                    </button>
                    </div>
    </>
  )
}

export default UpdateNotify