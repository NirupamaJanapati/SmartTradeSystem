export const getSelectedPair = state => state.trade.getIn(['tradeForm', 'pair']);
export const getBuySellType = state => state.trade.getIn(['tradeForm', 'type']);
export const getTradeAmount = state => state.trade.getIn(['tradeForm', 'amount']);
export const getTradeRate = state => state.trade.getIn(['tradeForm', 'rate']);
export const getManualTradeMessage = state => state.trade.get('manualTrade');
export const getAllTrades = state => state.trade.get('allTrades');
export const getDailyRecommendations = state => state.resources.get('dailyRecommendations');
export const getLiveData = state => state.trade.get('liveData');
export const getClosedDeals = state => state.trade.get('closedDeals');