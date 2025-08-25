import { useState } from "react";
import { HotelForm } from "../../components/Hotel/HotelForm"
import { useAppSelector } from "../../hooks";
import { IHotel } from "../../interfaces";
import { GetError } from "../../scripts";

export const Hotel = (hotel?:IHotel)=>{
      const { data, loading, error } = useAppSelector((state) => state.apiAction);
      const [form, setForm] = useState<IHotel>( 
        hotel?hotel
        :{
        id:"",
        title:"",
        description:"",
              });

     const HandleGetData=()=>{
    
            console.log("data")
  }


  const cancelData=()=>{
    console.log("canceled")
  }

    return <>
     <HotelForm
            form={form}
            setForm={setForm}
            onSubmit={HandleGetData}
            isError={error ? GetError(error) : undefined}
            isLoading={loading}
            onCancel={cancelData}
          />
</>
}