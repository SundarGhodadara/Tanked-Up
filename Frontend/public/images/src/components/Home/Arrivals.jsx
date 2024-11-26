
import './Arrivals.css';
import jsonData from './NewArrivals.json';


function arrivals() {

  const data = jsonData.arrivals;

  return (
    <div className='arrival-container'>
      <div className="text-container">
        <h3>LATEST DROPS</h3>
        <h1>NEW ARRIVALS</h1>
      </div>
      <div className="arrival-cards">
        {data.map((e) => {
          return (
            <div className="card" key={e.id}>
              <img src={e.url} alt="" />
            </div>
          )
        })}
      </div>
      <a href="./Arrivals-ViewMore.jsx" className="bn13">VIEW MORE</a>
    </div>
  )
}

export default arrivals
