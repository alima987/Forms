import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../redux/store';
import { RootState } from '../redux/store';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreeTerms: boolean;
  country: string;
  image: string;
}

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const hookFormData = useSelector((state: RootState) => state.hookFormData);
  const countries = useSelector((state: RootState) => state.countries);
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(setHookFormData(data));
  };

  return (
    <div>
      <h2>Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            defaultValue={hookFormData.name}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...register('age', { required: 'Age is required', min: 0 })}
            defaultValue={hookFormData.age}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            {...register('email', { required: 'Email is required' })}
            defaultValue={hookFormData.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            defaultValue={hookFormData.password}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', { required: 'Confirm Password is required' })}
            defaultValue={hookFormData.confirmPassword}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              value="male"
              {...register('gender', { required: 'Gender is required' })}
              defaultChecked={hookFormData.gender === 'male'}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              value="female"
              {...register('gender', { required: 'Gender is required' })}
              defaultChecked={hookFormData.gender === 'female'}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div>
          <label htmlFor="agreeTerms">
            <input
              type="checkbox"
              id="agreeTerms"
              {...register('agreeTerms', { required: 'You must agree to the terms' })}
              defaultChecked={hookFormData.agreeTerms}
            />
            Agree to Terms
          </label>
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            {...register('country', { required: 'Country is required' })}
            defaultValue={hookFormData.country}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </form>
      <input type="file" {...register('image')} accept=".png, .jpeg, .jpg" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
};

export default HookForm;
