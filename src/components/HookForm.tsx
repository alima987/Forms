import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
}

const HookForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = () => {};

  return (
    <div>
      <h2>Hook Form</h2>
      <p>This is a form created with the help of React Hook Form.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First Name is required' })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last Name is required' })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
