import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  themeReducer,
  rtlReducer,
  customizerReducer,
  newOrderTableReducer,
  sidebarReducer,
  authReducer,
  roundBordersReducer,
  blocksShadowsReducer,
  cryptoTrendsReducer,
  globalQuotesReducer,
  quotesBySymbolReducer,
  topTenReducer,
  ChuHangReducer,
  ChuHangNameReducer,
  loadingReducer,
  idFirstReducer,
  ChuHangArrReducer,
  TokenReducer,
  arrCostReducer,
  KhoArrReducer,
} from '@/redux/reducers/index';
import appConfigReducer from '@/redux/reducers/appConfigReducer';

const reducer = combineReducers({
  theme: themeReducer,
  rtl: rtlReducer,
  border: roundBordersReducer,
  shadow: blocksShadowsReducer,
  appConfig: appConfigReducer,
  customizer: customizerReducer,
  newOrder: newOrderTableReducer,
  sidebar: sidebarReducer,
  user: authReducer,
  cryptoTrends: cryptoTrendsReducer,
  globalQuotes: globalQuotesReducer,
  quotesBySymbol: quotesBySymbolReducer,
  topTen: topTenReducer,
  idchuhang: ChuHangReducer,
  namechuhang: ChuHangNameReducer,
  loading: loadingReducer,
  idfirst: idFirstReducer,
  arrChuHang: ChuHangArrReducer,
  token: TokenReducer,
  arrCost: arrCostReducer,
  idKho: KhoArrReducer,
});
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
