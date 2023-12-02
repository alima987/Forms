import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
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

export interface RootState {
  uncontrolledFormData: FormState;
  hookFormData: FormState;
  countries: string[];
}

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  agreeTerms: false,
  country: '',
  image: '',
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

const hookFormSlice = createSlice({
  name: 'hookFormData',
  initialState,
  reducers: {
    setHookFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      Object.assign(state, action.payload);
    },
  },
});
const countriesSlice = createSlice({
  name: 'countries',
  initialState: [
    'USA',
    'Canada',
    'Germany',
    'Japan',
    'Kazakstan',
    'Ukraine',
    'Russia',
    'Belarus',
    'Netherlands',
    'Czech Republic',
    'Spain',
    'Italy',
    'Turkey',
    'France',
  ],
  reducers: {},
});

export const { setUncontrolledFormData } = uncontrolledFormSlice.actions;
export const { setHookFormData } = hookFormSlice.actions;

export const store = configureStore({
  reducer: {
    uncontrolledFormData: uncontrolledFormSlice.reducer,
    hookFormData: hookFormSlice.reducer,
    countries: countriesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
