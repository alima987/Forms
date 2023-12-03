import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../redux/store';
import { RootState } from '../redux/store';
import * as yup from 'yup';
import { schema } from './validationSchema';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string>('');
  const hookFormData = useSelector((state: RootState) => state.hookFormData);
  const countries = useSelector((state: RootState) => state.countries);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    trigger,
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
    const image = previewImage || '';
    dispatch(setHookFormData({ ...data, image }));
    navigate('/');
  };
  const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setPreviewImage(base64Image);
        setValue('image', base64Image);
        trigger('image');
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setValue('image', previewImage);
    trigger('image');
  }, [previewImage, setValue, trigger]);

  const makeInputChange =
    (fieldName: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(fieldName, e.target.value);
      trigger(fieldName);
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
          <input type="number" {...register('age')} onChange={makeInputChange('age')} />
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
          <input type="password" {...register('password')} onChange={makeInputChange('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword')}
            onChange={makeInputChange('confirmPassword')}
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
          <input type="file" {...register('image')} onChange={handlePictureChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          )}
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
