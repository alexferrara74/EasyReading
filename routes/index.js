var express = require('express');
const multer = require('multer');
var router = express.Router();
const upload = multer({ dest: 'routes/uploads/' });
const path = require('path');
const pathFile = 'uploads/';
const fs = require('fs');
const fileService = require('./service/fileService');



/* GET home page. */
/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Esempio di rotta
 *     description: Restituisce un messaggio di esempio
 *     responses:
 *       200:
 *         description: Messaggio di successo
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




// API POST per caricare un file e leggerlo
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Carica un file e restituisce il suo contenuto
 *     description: Questa API consente di caricare un file tramite form-data e leggere il suo contenuto testuale.
 *     tags:
 *       - Upload
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Il file da caricare
 *           required:
 *             - file
 *     responses:
 *       200:
 *         description: File caricato e letto con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Messaggio di successo
 *                   example: File caricato e letto con successo!
 *                 content:
 *                   type: string
 *                   description: Il contenuto del file caricato
 *                   example: Contenuto del file caricato
 *       400:
 *         description: Nessun file caricato
 *       500:
 *         description: Errore durante la lettura del file
 */
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nessun file caricato.');
  }

  const filePath = path.join(__dirname,'uploads', req.file.filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Errore durante la lettura del file.');
    }
    //Chiamo il service per fare export del file pdf
      fileService.exportPdf(filePath);

    res.send({
      message: 'File caricato e letto con successo!',
    });
  });
});

module.exports = router;
