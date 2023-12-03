import * as yup from 'yup';

export const schema = yup.object().shape({
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
        return value[0]?.size <= 1024 * 1024 * 2;
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
