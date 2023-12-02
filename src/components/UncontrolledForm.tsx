import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData } from '../redux/store';
import { RootState } from '../redux/store';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledFormData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setUncontrolledFormData(value));
  };

  return (
    <div>
      <h2>Uncontrolled Form</h2>
      <p>This is a form created using uncontrolled components approach.</p>
      <div>
        <label htmlFor="uncontrolledInput">Data:</label>
        <input
          type="text"
          id="uncontrolledInput"
          value={uncontrolledFormData}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default UncontrolledForm;
