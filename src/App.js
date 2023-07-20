import { useState } from 'react';
import axios from 'axios'

import logo from './logo.svg';
import './App.css';

function App() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const isStrongPassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasThreeRepeatingChars = /(.)\1\1/.test(password);

    return (
      password.length >= 6 &&
      password.length <= 20 &&
      hasLowerCase &&
      hasUpperCase &&
      hasDigit &&
      !hasThreeRepeatingChars
    );
  }

  function minStepsToStrongPassword(password) {
    const MIN_LENGTH = 6;
    const MAX_LENGTH = 20;

    // Check if the password is already strong
    if (isStrongPassword(password)) {
      return 0;
    }

    let missingLength = Math.max(0, MIN_LENGTH - password.length);
    let missingLowercase = !/[a-z]/.test(password);
    let missingUppercase = !/[A-Z]/.test(password);
    let missingDigit = !/\d/.test(password);

    let repeatingChars = 0;
    for (let i = 2; i < password.length; i++) {
      if (password[i] === password[i - 1] && password[i] === password[i - 2]) {
        repeatingChars++;
      }
    }

    let totalSteps = 0;
    if (missingLength > 0) {
      totalSteps += missingLength;
    }

    let missingTypes = missingLowercase + missingUppercase + missingDigit;
    totalSteps = Math.max(totalSteps, missingTypes);

    if (password.length <= MAX_LENGTH && repeatingChars > 0) {
      totalSteps = Math.max(totalSteps, Math.ceil(repeatingChars / 3));
    }

    return totalSteps;
  }

  const handleSubmit = () => {
    console.log(username)
    console.log(password)
    let password_strength = minStepsToStrongPassword(password);
    if (password_strength) {
      alert(password_strength + " is failed");
      return;
    }
    axios({
      url: "http://localhost:8081/user/save",
      method: "POST",
      headers: {},
      data: {
        username: username,
        password: password
      }
    }).then(res => {
      console.log("QQQQQQQQQQQQQ")
    }).catch(err => {
      console.log("EEEEEEEEEEE")
    })
    // alert('aaaa');
  }

  return (
    <div className="App">
      <header className="App-header">
        <label>
          UserName
        </label>
        <input type='text' id="username" value={username || ''} onChange={(e) => setUserName(e.target.value)}></input>
        <label>
          Password
        </label>

        <input type='password' id="password" value={password || ''} onChange={e => setPassword(e.target.value)}></input>
        <br></br>
        <button onClick={handleSubmit}>Submit</button>
      </header>
    </div >
  );
}

export default App;
