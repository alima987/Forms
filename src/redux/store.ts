import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  uncontrolledFormData: string;
  hookFormData: { firstName: string; lastName: string };
}

const initialState: AppState = {
  uncontrolledFormData: '',
  hookFormData: { firstName: '', lastName: '' },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<string>) => {
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData: (state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      state.hookFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
