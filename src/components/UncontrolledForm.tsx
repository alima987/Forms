import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUncontrolledFormData } from '../redux/store';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledFormData);

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

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      // Обработка несовпадения паролей
    } else {
      // Обработка совпадения паролей
    }
  };

  const handleFileChange = () => {
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (file) {
      // Проверка размера и расширения файла, а затем сохранение в хранилище Redux в формате base64
      const fileSize = file.size;
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileSize > 1024 * 1024 || !(fileExtension === 'png' || fileExtension === 'jpeg')) {
        // Обработка недопустимого файла
        alert(
          'Invalid file. Please upload a file with size less than 1MB and in PNG or JPEG format.'
        );
        fileInput.value = ''; // Очистить значение ввода
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result?.toString() || '';
          dispatch(setUncontrolledFormData({ image: base64Data }));
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Добавляем логику для сохранения данных в хранилище
    // Это пример. Реальную логику нужно адаптировать к вашим требованиям
    dispatch(setUncontrolledFormData(uncontrolledFormData));

    // Переходим на главную страницу
    navigate('/');
  };
  return (
    <div>
      <h2>Uncontrolled Form</h2>
      <form onSubmit={handleSubmit}></form>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={uncontrolledFormData.name}
        />
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
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => {
            handleInputChange(e);
            handlePasswordChange();
          }}
          ref={passwordRef}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => {
            handleInputChange(e);
            handlePasswordChange();
          }}
          ref={confirmPasswordRef}
        />
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
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          onChange={handleInputChange}
          value={uncontrolledFormData.country}
        />
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
      </div>
      <button type="submit">Submit</button>
    </div>
  );
};

export default UncontrolledForm;
