import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}



export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]) {
    const price_abc = (serverRespond[0].top_ask.price+serverRespond[0].top_bid.price)/2;
    const price_def = (serverRespond[1].top_ask.price+serverRespond[1].top_bid.price)/2;
    const ratio = price_abc/price_def;
    const upper_bound = 1 + 0.03;
    const lower_bound = 1 - 0.03;
    const timestamp = serverRespond[0].timestamp > serverRespond[1].timestamp ? serverRespond[0].timestamp:serverRespond[1].timestamp;
    const trigger_alert = (ratio>upper_bound || ratio<lower_bound) ? ratio:undefined;
    return {
      price_abc,
      price_def,
      ratio,
      timestamp,
      upper_bound,
      lower_bound,
      trigger_alert,
    };
  }
}