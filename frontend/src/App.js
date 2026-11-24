import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://192.168.1.27:3000/counter';

function App() {
  const [total, setTotal] = useState(0);
  const [inputNumber, setInputNumber] = useState('');

  const fetchTotal = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.totalValue !== undefined) {
        setTotal(response.data.totalValue);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTotal();
    const interval = setInterval(fetchTotal, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!inputNumber) return;
    try {
      const response = await axios.post(`${API_URL}/add`, {
        amount: Number(inputNumber),
      });
      setTotal(response.data.totalValue);
      setInputNumber('');
    } catch (error) {
      console.error('Error adding number:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow text-center">
            <div className="card-header bg-primary text-white">
              <h4>Shared Live Counter</h4>
            </div>
            <div className="card-body">
              <h6 className="text-muted">လက်ရှိ စုစုပေါင်းရလဒ်</h6>
              <h1 className="display-3 fw-bold text-success my-3">{total}</h1>

              <form onSubmit={handleAdd} className="d-flex gap-2 mt-4">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="ပေါင်းလိုသော ဂဏန်းရိုက်ပါ..."
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary btn-lg px-4">
                  ပေါင်းမည်
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
