import { createSlice } from '@reduxjs/toolkit';

const routerSlice = createSlice({
  name: 'router',
  initialState: {
    currentRoute: '/'
  },
  reducers: {
    setCurrentRoute(state, action) {
      state.currentRoute = action.payload;
    }
  }
});

export const { setCurrentRoute } = routerSlice.actions;

export default routerSlice.reducer;
