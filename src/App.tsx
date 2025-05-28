import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmit] = useState(false);
  const [answer, setAnswer] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const fetchSummary = async (
      doneCall: Dispatch<SetStateAction<boolean>>
    ) => {

      const response = await fetch("http://localhost:3000/snippet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: query }),
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported in this environment.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let partial: string = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        partial += decoder.decode(value, { stream: true });
        setAnswer(partial);
      }

      doneCall(false);
    };
    if (submitted) {
      fetchSummary(setSubmit);
    }
  }, [setSubmit, query, submitted]);

  return (
    <>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <textarea
            style={{
              width: 800,
              height: 400,
              overflowY: "scroll",
              background: "white",
              color: "black",
            }}
            contentEditable={false}
            value={answer}
          ></textarea>
          <textarea
            style={{
              minWidth: 800,
              minHeight: 200,
              background: "white",
              color: "black",
            }}
            disabled={submitted}
            value={query}
            onChange={onChange}
          ></textarea>
          <button
            style={{ width: "100px", height: 80 }}
            onClick={() => {
              setSubmit(true);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
