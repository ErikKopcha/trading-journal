import { Category, Trade, TRADE_RESULTS, TRADE_SIDES } from '../types/position';
import { calculateInvestment, calculatePnl, calculateRiskPercent } from './calculations';

interface CreateTradeData {
  date: string;
  symbol: string;
  side: string;
  entryPrice: number;
  positionSize: number;
  stopLoss?: number;
  deposit?: number;
  exitPrice?: number;
  commission?: number;
  leverage?: number;
  category?: Category;
  comment?: string;
}

export function createTradeData(data: CreateTradeData): Omit<Trade, 'id'> {
  const {
    date,
    symbol,
    side,
    entryPrice,
    positionSize,
    stopLoss = 0,
    deposit = 0,
    exitPrice = 0,
    commission = 0,
    leverage = 0,
    category = { id: '', name: 'solo' },
    comment = '',
  } = data;

  // Validate and convert side
  const validSide = side.toUpperCase() as TRADE_SIDES;
  if (!Object.values(TRADE_SIDES).includes(validSide)) {
    throw new Error(`Invalid side: ${side}`);
  }

  const calculatedPnl = calculatePnl({
    side: validSide,
    entryPrice,
    exitPrice,
    positionSize,
    commission,
  });

  return {
    date: new Date(date),
    symbol,
    side: validSide,
    entryPrice,
    positionSize,
    stopLoss,
    deposit,
    exitPrice,
    commission,
    leverage,
    category,
    comment: comment ?? '',
    investment: calculateInvestment({
      entryPrice,
      positionSize,
      leverage,
    }),
    pnl: calculatedPnl,
    riskPercent: calculateRiskPercent({
      side: validSide,
      entryPrice,
      stopLoss,
      positionSize,
      deposit,
    }),
    result: exitPrice
      ? calculatedPnl > 0
        ? TRADE_RESULTS.WIN
        : TRADE_RESULTS.LOSS
      : TRADE_RESULTS.PENDING,
  };
}
