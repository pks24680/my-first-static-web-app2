import React, { useRef, useState } from 'react';
import './Login.css';
import {Switch} from '@mui/material';

export default function WordFunc() {
  const downloadLink = useRef(null);

  const [generatedDocLink, setGeneratedDocLink] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServerTemplate = async () => {
    try {
      // Data to be sent to the server
      // const data = {
      //   name: 'Gavin Cookman',
      //   company: 'KPMG',
      //   date: '1st December 2023',
      // };

      // Make a POST request to the server
      const response = await fetch('http://localhost:3001/generateWordDoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Get the generated Word document link from the response headers

        const blob = await response.blob();
        const docLink = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = docLink;
        link.download = 'generate-document.docx';
        link.click();

        URL.revokeObjectURL(docLink);

        // const docLink = response.headers.get('Content-Disposition');
        // setGeneratedDocLink(docLink);
      } else {
        console.error('Failed to generate Word document:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating Word document:', error.message);
    }
  };

    const handleServerDownload = async() => {
      try {
        const response = await fetch('http://localhost:3001/worddoc');
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'custom-document.docx';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading document: ', error);
      }
    };

  return (
    <div className="Page">
      <h1 >Click the button to download</h1>
      {/* <button className={'loginBtn'} onClick={handleTemplate}>Template Method</button> */}
      {/* <button className={'loginBtn'} onClick={handleSimple}>Simple Method</button> */}
      {/* <button className={'loginBtn'} onClick={handleZip}>Zip Method</button> */}
      <label><input type="text" placeholder="name" name="name" value={formData.name} onChange={handleInputChange}/></label>
      <label><input type="text" placeholder="Company" name="company" value={formData.company} onChange={handleInputChange}/></label>
      <label><input type="text" placeholder="Date" name="date" value={formData.date} onChange={handleInputChange}/></label>
      {/* <button className={'loginBtn'} onClick={handleServerDownload}>Server Method</button> */}
      <button className={'loginBtn'} onClick={handleServerTemplate}>Server Template Method</button>
      <a href={downloadLink} style={{ display: 'none' }} />
      <Switch/>
      <Switch/>
      <Switch/>
      <Switch/>
      <Switch/>
      <Switch/>
      <Switch/>
      <Switch/>
      <Switch/>
      <Switch/>
    </div>
  );
}

// const handleSimple = () => {
//   // Your Word document content in binary format
//   //const docxContent = generateDocxContent();
//   const docxContent = 'Please work. I need to feed my kids';

//   // Create a Blob
//   const blob = new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessing.document' });

//   // Create a download link
//   const a = document.createElement('a');
//   a.href = URL.createObjectURL(blob);
//   a.download = 'document.docx';

//   // Append the link to the body, trigger a click event, and remove the link
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);

//   // Revoke the Blob URL to free up resources
//   URL.revokeObjectURL(a.href);
// };

// // Function to generate your Word document content in binary format
// const generateDocxContent = () => {
//   const zip = new JSZip();

//   // Word document content
//   const content =
//     '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
//     '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
//     '<w:body>' +
//     '<w:p>' +
//     '<w:r>' +
//     '<w:t>Hello, this is a simple DOCX document!</w:t>' +
//     '</w:r>' +
//     '</w:p>' +
//     '</w:body>' +
//     '</w:document>';

//   // Add content to the zip file
//   zip.file('word/document.xml', content);

//   // Generate the ZIP file as a Blob
//   const zipContent = zip.generate({ type: 'arraybuffer' });

// // Convert to Blob
// const zipBlob = new Blob([zipContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

//   return content;
// };

// const handleTemplate = async () => {
//   try {
//     const templateContent = data;
//     console.log("Template: ", templateContent);

//     const doc = new Docxtemplater();
//     console.log('template loaded')
//     doc.loadZip(new PizZip(templateContent));
//     console.log("zip loaded")

//     doc.setData({ name: 'John' });
//     console.log("doc: done")
//     console.log(doc);

//     doc.render();

//     const blob = doc.getZip().generate({ 
//       type: 'blob', 
//       mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     });

//     const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = 'document.docx';

//   // Append the link to the body, trigger a click event, and remove the link
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);

//   // Revoke the Blob URL to free up resources
//   URL.revokeObjectURL(link.href);
    
//   } catch (error) {
//     console.error('Error: ', error);
//   };
// };

//   const handleZip = async () => {
//     try {
//       // Fetch the zip file
//       const response = await fetch('./dummyDoc.zip');
//       const zipData = await response.arrayBuffer();

//       // Create a JSZip instance and load the zip file
//       const zip = new JSZip();
//       zip.load(zipData);

//       // Access a specific file from the zip (e.g., 'file.txt')
//       const fileContent = await zip.file('dummyDoc.docx').async('string');

//       // Create a Blob with the file content
//       const blob = new Blob([fileContent], { type: 'text/plain' });

//       // Create a download link
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = 'downloaded-file.txt';

//       // Append the link to the body, trigger a click event, and remove the link
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       // Revoke the Blob URL to free up resources
//       URL.revokeObjectURL(link.href);
//     } catch (error) {
//       console.error('Error: ', error);
//     }
//   };