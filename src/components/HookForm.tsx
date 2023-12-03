import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../redux/store';
import { RootState } from '../redux/store';
import * as yup from 'yup';

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

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name should start with an uppercase letter'),
  age: yup.number().required('Age is required').positive('Age should be a positive number'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/,
      'Password should contain at least 8 characters, including 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms'),
  country: yup.string().required('Country is required'),

  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      if (value instanceof FileList) {
        return value[0]?.size <= 1024 * 1024 * 2; // 2MB
      }
      return false;
    })
    .test('fileType', 'Invalid file type. Only PNG and JPEG are allowed.', (value) => {
      if (value instanceof FileList) {
        return value[0] && ['image/png', 'image/jpeg'].includes(value[0].type);
      }
      return false;
    }),
});

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const hookFormData = useSelector((state: RootState) => state.hookFormData);
  const countries = useSelector((state: RootState) => state.countries);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: async (data: FieldValues) => {
      try {
        await schema.validate(data, { abortEarly: false });
        return { values: data, errors: {} };
      } catch (validationErrors) {
        const yupErrors: Record<string, string> = {};
        if (validationErrors instanceof yup.ValidationError) {
          validationErrors.inner.forEach((err) => {
            if (err.path) {
              const path = err.path as string;
              yupErrors[path] = err.message;
            }
          });

          Object.keys(yupErrors).forEach((key) => {
            setError(key as keyof FormData, { type: 'manual', message: yupErrors[key] });
          });
        }

        return { values: {}, errors: yupErrors };
      }
    },
  });

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
            {...register('name')}
            defaultValue={hookFormData.name}
            onChange={(e) => {
              setValue('name', e.target.value);
              schema
                .validateAt('name', { name: e.target.value })
                .then(() => setError('name', { type: 'manual', message: '' }))
                .catch((err) => setError('name', { type: 'manual', message: err.message }));
            }}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...register('age', { required: 'Age is required', min: 0 })}
            defaultValue={hookFormData.age}
            onChange={(e) => {
              setValue('age', parseInt(e.target.value, 10));
              schema
                .validateAt('age', { age: e.target.value })
                .then(() => setError('age', { type: 'manual', message: '' }))
                .catch((err) => setError('age', { type: 'manual', message: err.message }));
            }}
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <p className="error-message">{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            {...register('email', { required: 'Email is required' })}
            defaultValue={hookFormData.email}
            onChange={(e) => {
              setValue('email', e.target.value);
              schema
                .validateAt('email', { email: e.target.value })
                .then(() => setError('email', { type: 'manual', message: '' }))
                .catch((err) => setError('email', { type: 'manual', message: err.message }));
            }}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            defaultValue={hookFormData.password}
            onChange={(e) => {
              setValue('password', e.target.value);
              schema
                .validateAt('password', { password: e.target.value })
                .then(() => setError('password', { type: 'manual', message: '' }))
                .catch((err) => setError('password', { type: 'manual', message: err.message }));
            }}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', { required: 'Confirm Password is required' })}
            defaultValue={hookFormData.confirmPassword}
            onChange={(e) => {
              setValue('confirmPassword', e.target.value);
              schema
                .validateAt('confirmPassword', { confirmPassword: e.target.value })
                .then(() => setError('confirmPassword', { type: 'manual', message: '' }))
                .catch((err) =>
                  setError('confirmPassword', { type: 'manual', message: err.message })
                );
            }}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
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
              onChange={() => {
                setValue('gender', 'male');
                schema
                  .validateAt('gender', { gender: 'male' })
                  .then(() => setError('gender', { type: 'manual', message: '' }))
                  .catch((err) => setError('gender', { type: 'manual', message: err.message }));
              }}
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
              onChange={() => {
                setValue('gender', 'female');
                schema
                  .validateAt('gender', { gender: 'female' })
                  .then(() => setError('gender', { type: 'manual', message: '' }))
                  .catch((err) => setError('gender', { type: 'manual', message: err.message }));
              }}
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <p className="error-message">{errors.gender.message}</p>}
        </div>
        <div>
          <label htmlFor="agreeTerms">
            <input
              type="checkbox"
              id="agreeTerms"
              {...register('agreeTerms', { required: 'You must agree to the terms' })}
              defaultChecked={hookFormData.agreeTerms}
              onChange={(e) => {
                setValue('agreeTerms', e.target.checked);
                schema
                  .validateAt('agreeTerms', { agreeTerms: e.target.checked })
                  .then(() => setError('agreeTerms', { type: 'manual', message: '' }))
                  .catch((err) => setError('agreeTerms', { type: 'manual', message: err.message }));
              }}
            />
            Agree to Terms
          </label>
          {errors.agreeTerms && <p className="error-message">{errors.agreeTerms.message}</p>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            {...register('country', { required: 'Country is required' })}
            defaultValue={hookFormData.country}
            className={errors.country ? 'error' : ''}
            onChange={(e) => {
              setValue('country', e.target.value);
              schema
                .validateAt('country', { country: e.target.value })
                .then(() => setError('country', { type: 'manual', message: '' }))
                .catch((err) => setError('country', { type: 'manual', message: err.message }));
            }}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="error-message">{errors.country.message}</p>}
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            {...register('image')}
            accept=".png, .jpeg, .jpg"
            className={errors.image ? 'error' : ''}
            onChange={(e) => {
              const imageFile = e.target.files?.[0];
              if (imageFile) {
                const imageUrl = URL.createObjectURL(imageFile);
                setValue('image', imageUrl);
              }
              schema
                .validateAt('image', { image: e.target.files })
                .then(() => setError('image', { type: 'manual', message: '' }))
                .catch((err) => setError('image', { type: 'manual', message: err.message }));
            }}
          />
          {errors.image && <p className="error-message">{errors.image.message}</p>}
        </div>
        <div>
          <button type="submit" disabled={Object.keys(errors).length > 0}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HookForm;
