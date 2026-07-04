import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {

    axios.get(`${API}/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div
      style={{
        padding: 40,
        fontFamily: "Arial"
      }}
    >

      <h1>VisionDesk AI</h1>

      <h2>Backend Response</h2>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

    </div>

  );

}

export default App;