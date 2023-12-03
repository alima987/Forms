import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData } from '../redux/store';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name should start with a capital letter'),
  age: Yup.number()
    .positive('Age should be a positive number')
    .integer('Age should be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})/,
      'Password must contain at least 8 characters, including 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  gender: Yup.string().required('Gender is required'),
  agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the Terms'),
  image: Yup.mixed()
    .test('fileSize', 'File size is too large. Maximum is 1MB.', (value) => {
      if (!value) return true;
      const file = value as File;
      return file.size <= 1024 * 1024;
    })
    .test('fileType', 'Invalid file type. Only PNG and JPEG are allowed.', (value) => {
      if (!value) return true;
      const file = value as File;
      return ['image/png', 'image/jpeg'].includes(file.type);
    })
    .nullable(),
  country: Yup.string().required('Country is required'),
});

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledFormData);
  const countries = useSelector((state: RootState) => state.countries);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    const updatedData = {
      ...uncontrolledFormData,
      [name]: type === 'number' ? parseFloat(value) : value,
    };

    dispatch(setUncontrolledFormData(updatedData));
  };
  const handlePasswordChange = () => {};

  const handleFileChange = () => {};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await validationSchema.validate(uncontrolledFormData, { abortEarly: false });
      setErrors({});
      dispatch(setUncontrolledFormData(uncontrolledFormData));
      navigate('/');
    } catch (validationErrors) {
      const errorsObj: Record<string, string> = {};
      if (Yup.ValidationError.isError(validationErrors)) {
        validationErrors.inner.forEach((error: Yup.ValidationError) => {
          if (error.path) {
            errorsObj[error.path] = error.message;
          }
        });
      }
      setErrors(errorsObj);
    }
  };

  return (
    <div>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={uncontrolledFormData.name}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            onChange={handleInputChange}
            value={uncontrolledFormData.age}
          />
          {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={uncontrolledFormData.email}
          />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              handleInputChange(e);
              handlePasswordChange;
            }}
            ref={passwordRef}
          />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => {
              handleInputChange(e);
              handlePasswordChange;
            }}
            ref={confirmPasswordRef}
          />
          {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              value="male"
              name="gender"
              onChange={handleInputChange}
              defaultChecked={uncontrolledFormData.gender === 'male'}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              value="female"
              name="gender"
              onChange={handleInputChange}
              defaultChecked={uncontrolledFormData.gender === 'female'}
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
        </div>
        <div>
          <label htmlFor="agreeTerms">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              onChange={handleInputChange}
              defaultChecked={uncontrolledFormData.agreeTerms}
            />
            Agree to Terms
          </label>
          {errors.agreeTerms && <div style={{ color: 'red' }}>{errors.agreeTerms}</div>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            onChange={handleInputChange}
            value={uncontrolledFormData.country}
            list="countriesList"
          />
          <datalist id="countriesList">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <div style={{ color: 'red' }}>{errors.country}</div>}
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            ref={fileInputRef}
            accept=".png, .jpeg"
          />
          {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
