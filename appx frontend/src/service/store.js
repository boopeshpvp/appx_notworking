import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import thunk from 'redux-thunk';

import reducerFunction from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    encryptTransform({
      secretKey: 'appX-secret-key',
      onError: function (error) {
        console.log('error: ', error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, reducerFunction);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export default store;
