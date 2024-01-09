import React,{useState} from "react";
import * as XLSX from 'xlsx'
import {catalogueDetail} from "../../../Redux/Slice/catelogueSlice/catelogueSlice"
import { useDispatch, useSelector } from "react-redux"

const Dashboard = () => {

  const dispatch = useDispatch()
  const {  catalogueDetailStatus,  catalogueDetailError,catalogueRecord } = useSelector((State) => State.catelougeData)

  console.log("lkhlkhlhh",catalogueDetailStatus,catalogueRecord)

    const[excelData, setExcelData]=useState(null)
    const[excelFile, setExcelFile]=useState(null)



    const handleFile = (e) =>{

        let selectedFile = e.target?.files[0];
        if(selectedFile){

            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile)
            reader.onload=(e)=>{
                setExcelFile(e.target.result)
            }
            console.log("selectedFile" , selectedFile.type)

        }
        else{
            console.log("selectedFile" , selectedFile)
        }

    }

    console.log("excelfile",excelFile)

    const handleSubmit = (e)=>{
      e.preventDefault();

      if(excelFile !== null){
          const workbook = XLSX.read(excelFile,{type:'buffer'})
          const worksheetName = workbook?.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName]
          const data = XLSX.utils.sheet_to_json(worksheet)
          setExcelData(data)
          dispatch(catalogueDetail(data));
          window.location.reload();

      }
      else{
        setExcelData(null)
      }
    }

    console.log("exceldata",excelData)
    
  return (
    <div style={{ height: "87.6vh" }}>
      <div className="d-flex justify-content-center mb-2">
        <h1>Dashboard</h1>
      </div>
      <div className="container">
        <div className="form">
          <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
            <label>
              <h5>Upload Excel File</h5>
            </label>
            <input type="file" className="form-control" required  onChange={handleFile}/>
            <button type="submit" className="btn btn-success mt-4">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
