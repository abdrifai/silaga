import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// type initialState = {
//      value: AuthState;
// }

type AuthState = {
     isAuth: boolean,
     username: string,
     token: string
}

const initialState: { value: AuthState } = {
     value: {
          isAuth: false,
          username: "aira",
          token: ""
     }
}

export const auth = createSlice({
     name: "auth",
     initialState: initialState,
     reducers: {
          logOut: () => {
               return initialState
          },
          logIn: (state, action: PayloadAction<string>) => {
               state.value = {
                    isAuth: true,
                    username: action.payload,
                    token: "df2232sds222sdsd"
               };
          }
     }
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;