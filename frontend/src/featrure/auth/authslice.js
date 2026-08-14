import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";




export const registerUser=createAsyncThunk(
  "auth/register",
  async(userData,thunkAPI)=>{
   
    try {
      const response=await API.post("/register",userData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data|| {
                    message: error.message
                }
              )
    }
  }
)



export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    
    try {
      const response = await API.post("/login", userData);
      
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data || {
                    message: error.message
                });
    }
  }
);



export const getCurrentUser = createAsyncThunk(
    "auth/me",

    async (_, thunkAPI) => {

        try {

            const response = await API.get("/me");

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data || {
                    message: error.message
                }
            );

        }
    }
);






const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    authloading:false
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending,(state)=>{
        state.authloading=false;
      })
      .addCase(getCurrentUser.fulfilled,(state,action)=>{
        state.authloading=false;
        state.user=action.payload.data.user
      })
      .addCase(getCurrentUser.rejected,(state,action)=>{
        state.user=null;
        state.authloading=false
      })
      .addCase(registerUser.pending,(state)=>{
        state.loading=true
        state.error=null
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading=false

      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.loading=false
          
        state.error=action.payload.message
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        
        state.user = action.payload.data.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
      
         state.error =
        action.payload?.message ||
        action.error?.message ||
        "Login failed";
      });

       
      
  },
});

export default authSlice.reducer;