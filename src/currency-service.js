export class CurrencyService {
  async getExchangeRateByBase(base) {
    try {
      let response = await fetch(`https://prime.exchangerate-api.com/v5/${process.env.API_KEY}/latest/${base}`);
      return response.json();
    } catch (error) {
      return error;
    }
  }
}