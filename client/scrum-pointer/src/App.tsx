import React from 'react';
import Home from './screens/home';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ModeSelect from './screens/mode-select';
import NoAuthRedirect from './components/no-auth-redirect';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ChannelHome from './screens/channel-home';
import AuthenticatedRoute from './components/authenticated-route';
import ConnectToRoom from './screens/connect-to-room';

function App() {

  // Setting up persistent Redux

  const persistConfig = {
    key: 'root',
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    composeWithDevTools()
    );

  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={'null'} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path={'/'}>
              <Home />
            </Route>
            <AuthenticatedRoute path={'/select'}>
                <ModeSelect />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={'/room'}>
                <ChannelHome />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={'/connect'}>
                <ConnectToRoom />
            </AuthenticatedRoute>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
