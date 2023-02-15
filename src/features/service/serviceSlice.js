import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUniqueValues } from '../../utils/helper'
import {
  getCartFromLocalStorage,
  removeCartFromLocalStorage,
  setCartInLocalStorage,
} from '../../utils/localStorage'

const cart = getCartFromLocalStorage()
const initialState = {
  category: [],
  categoryIndex: 0,
  initialServiceList: [],
  serviceList: [],
  featureServices: [],
  newServices: [],
  singleService: '',
  singleServiceImages: [],
  nbHits: '',
  cart: cart || [],
  isLoading: false,

  // search
  searchTitle: '',
  searchCategory: '',
  // pagination
  list: [],
  page: 1,
  limit: 20,
  count: '',
  sort: '-createdAt',
  feature: false,
}

export const serviceThunk = createAsyncThunk(
  'service/serviceThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get()
      console.log('hello Thunk')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// get All Services Thunk
export const getAllServicesThunk = createAsyncThunk(
  'service/getAllServicesThunk',
  async (state, thunkAPI) => {
    try {
      const response = await customFetch.get(
        `/services?title=${state?.searchTitle}&category=${state?.searchCategory}&feature=${state?.feature}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`
      )

      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//  ==== Get Static Services
export const getServiceThunk = createAsyncThunk(
  'service/getServiceThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/services/static')

      const { services, nbHits } = response.data
      const category = getUniqueValues(services, 'category')

      return { category, services, nbHits }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//  ==== Get Single Services
export const getSingleServiceThunk = createAsyncThunk(
  'service/getSingleServiceThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.get(`services/static/${_id}`)

      return response.data.services
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    clearState: (state, { payload }) => {
      state.categoryIndex = 0
      // search
      state.searchTitle = ''
      state.searchCategory = ''
      // pagination
      state.page = 1
      state.limit = 20
      state.sort = '-createdAt'
      state.feature = false
    },
    // pagination

    next: (state, { payload }) => {
      console.log('next')
      state.page = state.page + 1
    },
    prev: (state, { payload }) => {
      console.log('prev')
      state.page = state.page - 1
    },
    index: (state, { payload }) => {
      const index = Number(payload)
      state.page = index
    },
    // feature solution
    handleFeature: (state, { payload }) => {
      state.feature = !state.feature
    },
    // cart
    emptyCart: (state, { payload }) => {
      removeCartFromLocalStorage()
      state.cart = []
    },
    getCart: (state, { payload }) => {
      state.cart = [...state.cart, payload]
      setCartInLocalStorage(state.cart)
    },
    removeCartItem: (state, { payload }) => {
      const cart = state.cart.filter((item) => item._id !== payload)
      state.cart = cart
      setCartInLocalStorage(state.cart)
    },
    increaseItemQuantity: (state, { payload }) => {
      const index = state.cart.findIndex((item) => {
        return item._id === payload
      })
      if (state.cart[index].quantity >= state.cart[index].totalStock) {
        toast.error('Maximum available stock.')
        return
      }
      state.cart[index].quantity = state.cart[index].quantity + 1

      setCartInLocalStorage(state.cart)
    },
    decreaseItemQuantity: (state, { payload }) => {
      const index = state.cart.findIndex((item) => {
        return item._id === payload
      })
      if (state.cart[index].quantity === 1) {
        return
      }
      state.cart[index].quantity = state.cart[index].quantity - 1
      setCartInLocalStorage(state.cart)
    },
  },
  extraReducers: {
    [serviceThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [serviceThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [serviceThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
    // Get All services Pagination

    [getAllServicesThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getAllServicesThunk.fulfilled]: (state, { payload }) => {
      state.list = payload.result
      state.count = payload.totalOrders

      state.isLoading = false
    },
    [getAllServicesThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
    },
    // ==== get Static services

    [getServiceThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getServiceThunk.fulfilled]: (state, { payload }) => {
      const { category, services, nbHits } = payload

      state.category = category
      state.featureServices = services.filter((item) => item.feature === true)
      state.newServices = payload.services.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      state.initialServiceList = services
      state.serviceList = services
      state.nbHits = nbHits
      state.isLoading = false
    },
    [getServiceThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)

      state.isLoading = false
    },
    //  ==== Get Single Service ====
    [getSingleServiceThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getSingleServiceThunk.fulfilled]: (state, { payload }) => {
      state.singleService = payload
      state.singleServiceImages = payload.uploadImage
      state.isLoading = false
    },
    [getSingleServiceThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const {
  clearState,
  next,
  prev,
  index,
  handleFeature,
  createFunction,
  getStateValues,
  getCart,
  emptyCart,
  removeCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = userSlice.actions
export default userSlice.reducer
