import React from 'react';
import { useSelector } from 'react-redux';
import Submit from './Submit';
import { RootState } from '../redux/store';

const Main: React.FC = () => {
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledFormData);
  const hookFormData = useSelector((state: RootState) => state.hookFormData);
  const hookFormSubmitData = useSelector((state: RootState) => state.hookFormSubmitData); // Add this

  return (
    <div>
      <h2>Main Page</h2>
      <p>This is the main page with links to other routes.</p>
      <Submit formData={uncontrolledFormData} formType="Uncontrolled Form" />
      <Submit formData={hookFormData} formType="Hook Form" />

      <Submit formData={hookFormSubmitData} formType="Hook Form Submission" />
    </div>
  );
};

export default Main;
