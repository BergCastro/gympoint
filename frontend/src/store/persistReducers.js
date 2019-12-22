import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gympoint',
      storage,
      whitelist: ['auth', 'user', 'aluno', 'plano', 'matricula'],
    },
    reducers
  );

  return persistedReducer;
};
