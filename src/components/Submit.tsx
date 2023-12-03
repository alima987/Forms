import React from 'react';

interface SubmitProps {
  formData: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    agreeTerms: boolean; // Updated property name
    image: string | FileList; // Updated property name
    country: string;
  };
  formType: string;
}

const Submit: React.FC<SubmitProps> = ({ formData, formType }) => {
  if (!formData) return null;

  const displayImage = () => {
    if (typeof formData.image === 'string') {
      return (
        <img src={formData.image} alt="User" style={{ maxWidth: '100px', maxHeight: '100px' }} />
      );
    } else if (formData.image instanceof FileList) {
      return <p>FileList (Handle this case appropriately)</p>;
    } else {
      return <p>Invalid image format</p>;
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>{formType}</h3>
      {displayImage()}
      <h4>Name: {formData.name}</h4>
      <p>Age: {formData.age}</p>
      <p>Email: {formData.email}</p>
      <p>Password: {formData.password}</p>
      <p>Gender: {formData.gender}</p>
      <p>Accepted?: {formData.agreeTerms.toString()}</p>
      <p>Country: {formData.country}</p>
    </div>
  );
};

export default Submit;
