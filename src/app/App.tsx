import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Main from '../components/Main';
import UncontrolledForm from '../components/UncontrolledForm';
import HookForm from '../components/HookForm';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/uncontrolled">Uncontrolled Form</Link>
            </li>
            <li>
              <Link to="/hook-form">Hook Form</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/uncontrolled" element={<UncontrolledForm />} />
          <Route path="/hook-form" element={<HookForm />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
