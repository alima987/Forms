import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../redux/store';
import { RootState } from '../redux/store';

interface FormData {
  firstName: string;
  lastName: string;
}

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const hookFormData = useSelector((state: RootState) => state.hookFormData);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(setHookFormData(data));
  };

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
            defaultValue={hookFormData.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last Name is required' })}
            defaultValue={hookFormData.lastName}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HookForm;
