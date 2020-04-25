import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Exchange } from './exchange.js';
import { CurrencyService } from './currency-service.js';


$(document).ready(function() {

  const DOMSelectors = {
    userAmount: $("#userAmount"),
    form: $("#exchangeForm"),
    panel: $(".itemPanel"),
    result: $("#result")
  };

 

  $(DOMSelectors.form).submit(function(event) {
    event.preventDefault();
    let baseCurrency = $("#baseCurrency :selected").val();
    let convertTo = $("#convertTo :selected").val();
    let userAmount = parseInt(DOMSelectors.userAmount.val());

    (async () => {
      let currencyService = new CurrencyService();
      const response = await currencyService.getExchangeRateByBase(baseCurrency);
      getElements(response);
    })();

    function getElements(response) {
      const { result, conversion_rates } = response;
      
      if(result === 'error') {
        return showError(response);
      } else if (!(convertTo in conversion_rates)) {
        // handle error
        return showError({ error: 'unknown-code' });
      }
      
      let conversionRate = conversion_rates[convertTo];
      let exchange = new Exchange(userAmount, conversionRate);
      let calcRate = exchange.calculate();
      showContent(calcRate);
    }
    
    function showError(response) {
      const { error } = response;
      
      let errMessage;
      switch (error) {
      case 'unknown-code':
        errMessage = 'That currency is not currently supported.';
      }
      
      DOMSelectors.result.text(errMessage);
      DOMSelectors.form.hide();
      DOMSelectors.panel.show();
    }

    function showContent(calculatedRate) {
      DOMSelectors.form.hide();
      DOMSelectors.panel.show();
      DOMSelectors.result.text(`Your calculated rate is ${calculatedRate}`);
      
    }
  });
});