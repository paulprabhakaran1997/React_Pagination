import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

function App() {

  const Details = useMemo(() =>(
    [
      { id: 1, name: "A" }, { id: 2, name: 'B' }, { id: 3, name: "C" },
      { id: 4, name: "A" }, { id: 5, name: 'B' }, { id: 6, name: "C" },
      { id: 7, name: "A" }, { id: 8, name: 'B' }, { id: 9, name: "C" },
      { id: 10, name: "A" }, { id: 11, name: 'B' }, { id: 12, name: "C" },
      { id: 13, name: "A" }, { id: 14, name: 'B' }, { id: 15, name: "C" },
    ]
  ),[]);

  const [data , setData] = useState([]);

  const [active, setActive] = useState(1);
  const paginationNumberItems = [];
  for (let number = 1; number <= 10; number++) {
    paginationNumberItems.push(
      <Pagination.Item onClick={() => setActive(number)} key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  const getDataForThisPage = (id) =>{
    const dataStart = parseInt(id -1) * 4 + 1;
    const dataEnd = dataStart +3;

    const filterDetails = Details.filter((data) => data.id >= dataStart && data.id <= dataEnd);

    setData(filterDetails)

  }

  useEffect(() =>{
    getDataForThisPage(active)
  },[active])

  const handlePrev = () => {
    setActive(prev => prev === 1 ? 1 : prev - 1)
  }

  const handleNext = () => {
    setActive(prev => prev === (paginationNumberItems.length) ? paginationNumberItems.length : prev + 1)
  }

  return (
    <div className="App">

      <Row>
        {data.length ? (
          data.map((elm) => (
            <Fragment key={elm.id}>
              <Col lg={3}>{elm.name}</Col>
            </Fragment>
          ))
        ) : (
          <Col>
            <h1>No Data</h1>
          </Col>
        )}
      </Row>




      <Pagination>
        <Pagination.Prev onClick={handlePrev} />
        {paginationNumberItems}
        <Pagination.Next onClick={handleNext} />
      </Pagination>
    </div>
  );
}

export default App;
