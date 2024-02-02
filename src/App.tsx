import "regenerator-runtime/runtime";
import React, { useState, useEffect } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import OpenAI from "openai";
import { FaMicrophone } from 'react-icons/fa';


function App() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gptData, setGptData] = useState<any | null>(null);

  const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  async function gptreq() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Hello GPT, you are acting as virtuchat, a online therapist that takes in an emotion, and words spoken by a person and gives a response. Here is the emotion" + data + " and what the person said" + transcript }],

      model: "gpt-3.5-turbo",
    });

    setGptData(completion.choices[0].message.content);
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  useEffect(() => {
    fetch("http://localhost:5003/")
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      });
  }, []);

  const [isListening, setIsListening] = useState(false);
  
  const handleStartListening = () => {
    if(isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({continuous: true});
    }
    setIsListening(!isListening);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">VirtuChat</h1>

        <div>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={gptreq}
          >
            Gpt response
          </button>
          <p>{gptData}</p>
          <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={handleStartListening}>
              <FaMicrophone size={24} color={listening ? "green":"red"}/>
            </button>
            <p>{transcript}</p>
          </div>
        </div>
        {data && (
          <div className="mt-4">
            <p className="text-xl font-semibold">Fetched Data:</p>
            <pre className="text-sm bg-gray-200 text-black p-2 rounded-md">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
