
const fs = require('fs');
const pdf = require('pdf-parse');

const { HfInference } = require("@huggingface/inference");

// Inizializza il client di Hugging Face
const hf = new HfInference('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');  


//funzione per effettuare export del file
function exportPdf(path) {
const pdfBuffer = fs.readFileSync(path);
pdf(pdfBuffer).then((data)=>{summarizeText(data.text.substring(1,1000))});
}

// Funzione per riassumere il testo
async function summarizeText(text) {
    const response =await hf.summarization({
      model: 't5-large',
      // model: 'facebook/bart-large-cnn', 
       // Modello BART per riassunto
    // inputs: JSON.stringify(text),
     inputs: text,
     // inputs: 'Perché sei triste nonno?» chiese Prince al vecchio con la barba chegli stava davanti. I grandi sono tutti tristi, Prince.Non possiamo farci niente» glispiegò il nonno. Ed ogni volta gliraccontava sempre la stessa storia,al caldo bagliore nella loro casettadi legno e di paglia. L’ultima forse,lontana dalla città degli alti palazzi che era stata un tempo il villaggio.«Da quando il cielo ci ha portatoviale stelle e la luna sorride timida,nessuno dei grandi è riuscito a fare più bei sogni',
    });
     console.log('Riassunto:', response.summary_text);  // Mostra il riassunto
  return response.summary_text;
   // console.log('Riassunto:', response.summary_text);  // Mostra il riassunto
  }
  


module.exports = {
    exportPdf
}
  