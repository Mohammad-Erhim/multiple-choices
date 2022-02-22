import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

function Speech() {
  const [value, setValue] = React.useState("");
  const { speak } = useSpeechSynthesis();
 
  return (
    <div  >
      <div  >
        <h2>Text To Speech Converter Using React Js</h2>
      </div>
      <div  >
        <textarea
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="group">
        <button onClick={() => speak({ text: value })}>Speech</button>
      </div>
    </div>
  );
}
export default Speech;
