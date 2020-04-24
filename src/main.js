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
      if(response) {
        let conversionRate = response.conversion_rates[convertTo];
        let exchange = new Exchange(userAmount, conversionRate);
        let calcRate = exchange.calculate();
        showContent(calcRate);
      } else {
        showContent(false);
      }
    }

    function showContent(calculatedRate) {
      DOMSelectors.form.hide();
      DOMSelectors.panel.show();
      if(calculatedRate) {
        DOMSelectors.result.text(`Your calculated rate is ${calculatedRate}`);
      } else {
        DOMSelectors.result.text("There was an error handling your request.");
      }
    }


  });


});