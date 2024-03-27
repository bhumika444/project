import React, { useState } from 'react';

function Addition() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [clientSum, setClientSum] = useState(null);
  const [serverSum, setServerSum] = useState(null);

  const handleCalculate = () => {
    const sum = Number(num1) + Number(num2);
    setClientSum(sum);

    // Call API to calculate sum on the server-side
    fetch('http://ec2-3-16-159-183.us-east-2.compute.amazonaws.com:3001/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ num1, num2 }),
    })
      .then(response => response.json())
      .then(data => {
        setServerSum(data.sum);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Server error');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="num1">First Number:</label>
            <input
              type="number"
              className="form-control"
              id="num1"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="num2">Second Number:</label>
            <input
              type="number"
              className="form-control"
              id="num2"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleCalculate}>Calculate Sum</button>
        </div>
        <div className="col-md-6">
          {clientSum !== null && (
            <div>
              <h4>Client-Side Sum:</h4>
              <p>{clientSum}</p>
            </div>
          )}
          {serverSum !== null && (
            <div>
              <h4>Server-Side Sum:</h4>
              <p>{serverSum}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addition;