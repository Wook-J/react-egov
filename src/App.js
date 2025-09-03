// import "./App_coin.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={process.env.PUBLIC_URL + "/movie/:id"} element={<Detail />} />
        <Route path={process.env.PUBLIC_URL + "/"} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [coins, setCoins] = useState([]);
//   const [myDollars, setMyDollars] = useState("");
//   const [selectedCoin, setSelectedCoin] = useState(null);

//   useEffect(() => {
//     fetch("https://api.coinpaprika.com/v1/tickers")
//       .then((response) => response.json())
//       .then(json => {
//         setCoins(json);
//         setSelectedCoin(json[0]);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleDollarChange = (event) => {
//     const value = event.target.value;
//     if (!isNaN(value)) {
//       setMyDollars(value);
//     }
//   };

//   const handleCoinChange = (event) => {
//     const selectedId = event.target.value;
//     const coin = coins.find((c) => c.id === selectedId);
//     setSelectedCoin(coin);
//   };

//   const coinsToBuy = myDollars > 0 && selectedCoin
//     ? (myDollars / selectedCoin.quotes.USD.price).toFixed(2)
//     : "0.00";

//   return (
//     <div className="container">
//       <div className="card">
//         <h1 className="title">코인 계산기</h1>

//         {loading ? (
//           <strong className="loading-text">로딩 중...</strong>
//         ) : (
//           <div className="content-wrapper">
//             <div className="input-group">
//               <label htmlFor="dollars" className="label">
//                 내가 가진 달러 ($)
//               </label>
//               <input
//                 id="dollars"
//                 type="text"
//                 value={myDollars}
//                 onChange={handleDollarChange}
//                 placeholder="0"
//                 className="input-field"
//               />
//             </div>

//             <div className="input-group">
//               <label htmlFor="coin-select" className="label">
//                 코인 선택
//               </label>
//               <select
//                 id="coin-select"
//                 value={selectedCoin?.id || ""}
//                 onChange={handleCoinChange}
//                 className="select-field"
//               >
//                 {coins.map((coin) => (
//                   <option key={coin.id} value={coin.id}>
//                     {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price.toFixed(4)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="result-box">
//               <p className="result-text">
//                 내가 가진 <strong className="result-strong">{myDollars || 0}</strong> 달러로
//               </p>
//               <p className="result-text mt-1">
//                 <strong className="result-strong">{selectedCoin?.name}</strong>을(를)
//               </p>
//               <p className="result-amount">
//                 <span>{coinsToBuy}</span>개 살 수 있어요!
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );


// const [toDo, setToDo] = useState("");
// const [toDos, setToDos] = useState([]);

// const onChange = (event) => setToDo(event.target.value);

// const onSubmit = (event) => {
//   event.preventDefault();
//   if (toDo === "") return;

//   setToDos(currentToDos => [toDo, ...currentToDos]);
//   setToDo("");
// };

// return (
//   <div>
//     <h1>My To Dos ({toDos.length})</h1>
//     <form onSubmit={onSubmit}>
//       <input
//         value={toDo}
//         onChange={onChange}
//         type="text"
//         placeholder="Write yort to do..."
//       />
//       <button>Add To Do</button>
//     </form>
//     <hr />
//     <ul>
//       {toDos.map((item, idx) => (
//         <li key={idx}>{item}</li>
//         ))
//       }
//     </ul>
//   </div>
// );
//}


