var fs = require('fs');
const {Configuration, OpenAIApi} = require("openai");

function openAi (transcript) {
    
    const configuration = new Configuration({
      organization: "$$$$$$$$$$$$$$$$$$$$$",
        apiKey: "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    });
    const openai = new OpenAIApi(configuration);
    const response = openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Write a blog post for small investors based on this information:\n" + transcript,
        temperature: 0,
        max_tokens: 900
    });
    response.then(response => {
      //console.log(response);
      console.log("----------------------------------------------------------------------------");
      console.log(JSON.stringify(response.data.choices[0].text));
      console.log("----------------------------------------------------------------------------");
      //fs.writeFile("response.txt",JSON.stringify(response.data),"utf8",(err,result)=>{console.log(err);console.log(result)})
    });
}
let text = ""


async function speechToText(){
//Speech to text
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const {GoogleAuth} = require('google-auth-library');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
 const gcsUri = 'gs://speech_to_text-11-22-2022/output.aac';
 const encoding = 'AAC';
 const sampleRateHertz = 44100;
 const languageCode = 'en-US';

const config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode,
};

const audio = {
  uri: gcsUri,
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
const [operation] = await client.longRunningRecognize(request);
// Get a Promise representation of the final result of the job
const [response] = await operation.promise();
const transcription = response.results
  .map(result => result.alternatives[0].transcript)
  .join('\n');
console.log(`Transcription: ${transcription}`);
}

fs.readFile("./transcript.txt","utf8", function(err,data){
  openAi(data.replace("\n",""));
})
