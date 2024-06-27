import { configureStore} from '@reduxjs/toolkit'
import championshipReducer from './sliceChampionship'

const store = configureStore({
    reducer:{
        championship:championshipReducer
    }
})

export default store;