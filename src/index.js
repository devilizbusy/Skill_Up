import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Article from './Component/Reducers/ArticleReducer'

const store= configureStore({
  reducer:{
    Blogs:Article,
  }
})

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
  <App />
  </Provider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

