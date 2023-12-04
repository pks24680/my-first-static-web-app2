import React, { useEffect, useState} from 'react';
import './TableTest.css';

import jsonData from './excelItems.json';

const ExcelJS = require('exceljs');


const TableTest = () => {
  
  // const hardcodedData = {
  //   products: [
  //     {
  //       id: '1',
  //       title: 'RCM1',
  //       description: 'This is the RCM1',
  //       category: 'Optimisim',
  //     },
  //     {
  //       id: '2',
  //       title: 'RCM2',
  //       description: 'This is the RCM2',
  //       category: 'Performance',
  //     },
  //     {
  //       id: '3',
  //       title: 'RCM3',
  //       description: 'This is the RCM3',
  //       category: 'transparency',
  //     },
  //   ],
  // };
  
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("excelItems.json")
    // .then((res) => res.json())
    // .then(async (data) => {
    //   console.log(data);
    //setData(data);
    //}//)
    //.then((json) => console.log(json));
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('./excelItems.json');
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
      setData(jsonData);
  }, []);

  

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 80;

    sheet.columns = [
      {
      header: "Id",
      key: 'id',
      width: 10
      }, 
      {
        header: "Title",
        key: 'title',
        width: 10
      }, 
      {
        header: "Description",
        key: 'description',
        width: 10
      }, 
      {
        header: "Category",
        key: 'category',
        width: 10
      }, 
  ];

  data?.products?.map(product => {
    sheet.addRow({
      id: product?.id,
      title: product?.title,
      description: product?.description,
      category: product?.category,
    })
  });

  workbook.xlsx.writeBuffer().then(data => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'download.xlsx';
    anchor.click();
    window.URL.revokeObjectURL(url);
  })
}

    return (        
        <div>
            <button className="btn btn-primary float-end mt-2 mb-2"
            onClick={exportExcelFile}>
                Export
            </button>
            <div className='tableContainer'>
            <table >
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(data?.products) &&
                    data?.products?.map((row) => (
                        <tr>
                            <td>{row?.id}</td>
                            <td>{row?.title}</td>
                            <td>{row?.description}</td>
                            <td>{row?.category}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
             </div>
         </div>
    )
}

export default TableTest;