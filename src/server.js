const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
const cors = require('cors');
const fs = require('fs');
const fs1 = require('fs').promises;
const path = require('path');
const Docxtemplater = require('docxtemplater');
const JSZip = require('jszip');

const app = express();
const PORT = 3001;

const filename = 'testDoc.docx';

app.use (cors());
app.use(bodyParser.json());
app.use('/worddoc', express.static(path.join(__dirname, '../public', filename)));

app.post('/generateWordDoc', async (req, res) => {
    try{
        const templatePath = path.join(__dirname, '../public', 'template.docx');
        const templateContent = fs.readFileSync(templatePath);

        const doc = new Docxtemplater();
        const templateBuffer = Buffer.from(templateContent, 'binary');
        doc.loadZip(new JSZip(templateContent));

        const data = req.body;
        console.log('Data:', data);
        doc.setData(data);

        try {
            doc.render();
        } catch (renderError) {
            console.error('Error rendering document:', renderError);
            res.status(500).json({ message: 'Error rendering document' });
        }

        const generatedContent = doc.getZip().generate({ type: 'nodebuffer' });
        const filePath = path.join(__dirname, '../public', 'generated-document.docx');

        //fs.writeFileSync(filePath, generatedContent);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=generated-document.docx');

        res.end(generatedContent, 'binary');
    } catch (error) {
        console.error('Error generating Word document:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res)  => {
    const {username, password} = req.body;
    //console.log('were in!!!');
   
    try {
        const data = await fs1.readFile('./logins.json', 'utf-8');
        //console.log('Contents of logins.json:', data);
        const jsonData = JSON.parse(data);
        //console.log('peepee');
        const users = jsonData.users;
        //console.log('json data works', data);
        
        const user = users.find(
            (u) => u.username === username && u.password === password
        );
        //console.log('find users works');
        
        if(user) {
            //console.log('Authentication success: ', username + ' ' + password);
            res.status(200).json({ message: 'Authentication Successful' });
        } else {
            //console.log('Authentication failed: ', username + ' ' + password);
            res.status(401).json({ message: 'Authentication Failed' });
        }
    } catch (error) {
        console.error('Error reading logins.json:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/worddoc', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../public',filename);
        
        console.log(filePath);
        
        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return res.status(404).send('File Not Found');
        }

        const fileStream = fs.createReadStream(filePath);
    
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=custom-document.docx');
    
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error serving document:', error);
        res.status(500).send('Internal Server Error');
    }
  });

app.listen(PORT, () => {
    console.log('Server is running on port:' + PORT);
});