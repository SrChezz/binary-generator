const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;

// Habilita el análisis de cuerpo JSON
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/download', (req, res) => {
    try {
        const data = req.body.data;
        console.log('Data received from client:', data);

        //Guarda los datos en un archivo binario
        fs.writeFileSync('downloads/file.bin', data, 'utf-8');

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error en el servidor");
    }
});

app.get('/download', (req, res) => {
    try {
        let name = `${req.query.name}.bin` || 'file.bin'; // Obtén el nombre desde los parámetros de consulta
        console.log(name);
        const filePath = path.join(__dirname, 'downloads', 'file.bin');

        res.download(filePath, name, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Error sending file' });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error en el servidor");
    }
});


app.post("/test", async (req, res) => {
    try {
        console.log("post test");
        res.redirect("/test");

    } catch (error) {
        console.error("Error: ", error);
    }
})

app.get("/test", async (req, res) => {
    try {
        console.log("get test");
        const filePath = path.join(__dirname, 'downloads', 'file.bin');
        res.download(filePath, "test.bin", (err) => {
            console.log("I don't know what I amd doing :c")
        })
    } catch (error) {
        console.error("Error: ", error);
    }
})

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
