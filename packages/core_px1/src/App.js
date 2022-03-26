import logo from './logo.svg';
import './App.css';
import * as AuthLibrary from '@monorepo_demo/auth';

new AuthLibrary.Auth({
  baseURL: 'https://reqres.in',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
},
    [403, 402, 403, 401, 400],
    () => {
  console.log('chay  vao callback');
    }
).login('/api/login', {
  "email": "eve.holtsdaasasasdds@reqres.in",
  "password": "dsasadsadsad"
}).then(response => {
  console.log(`show response data`);
  console.log(response);
}).catch(err => {
  console.log('show err:');
  console.log(err);
})
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
