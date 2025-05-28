import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import './App.css'
import { getConnection } from './BackendConnection';

function App() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmit] = useState(false);
  const [answer, setAnswer] = useState('');

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value);
  }

  useEffect(() => {
    const fetchSummary = async (done: Dispatch<SetStateAction<boolean>>) => {
      console.log('FETCHING');
      const response = await getConnection().post('/snippet', JSON.stringify({
        text: query
      }), {responseType: 'stream', headers: {"Content-Type":"application/json"}});

      response.data.on('data', (chunk) => {
        console.log('Received chunk:', chunk.toString());
        setAnswer((prev) => prev + chunk.toString());
      });

      done(false);
    }
    if (submitted) {
      fetchSummary(setSubmit);
    }
  }, [setSubmit, query, submitted])

  return (
    <>
      <div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <textarea style={{width: 800, height: 400, overflowY:'scroll', background: 'white', color: 'black'}} value={answer}></textarea>
            <textarea style={{minWidth: 800, minHeight: 200, background: 'white', color: 'black'}} disabled={submitted} value={query} onChange={onChange}></textarea>
            <button style={{width: '100px', height: 80}} onClick={() => {setSubmit(true)}}>Send</button>
          </div>
      </div>
    </>
  )
}

export default App
