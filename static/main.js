class Profile {
  constructor(username, { firstName, lastName }, password) {
    this.username = username;
    this.name = { firstName, lastName };
    this.password = password;
  };
  createUser(callback) {
    console.log(`Creating ${this.username}`);
    return ApiConnector.createUser(
      {
        this.username,
        this.name,
        this.password,
      }, (err, data) => {
      console.log(`${this.username} is created`);
      callback(err, data);
    });
  }
  authorizeUser(callback) {
    console.log(`Autorising ${this.username}`);
    return ApiConnector.performLogin({ this.username, this.password }, (err, data) => {
        console.log(`Autorised ${this.username}`);
        callback(err, data);
    });
  };
  addMoney({ currency, amount }, callback) {
    console.log(`Adding ${amount} of ${currency} to ${this.username}`);
    return ApiConnector.addMoney({ currency, amount }, (err, data) => {
        console.log(`Added ${amount} of ${currency} to ${this.username}`);
        callback(err, data);
    });
  }
  convertMoney({ fromCurrency, targetCurrency, targetAmount }) {
    console.log(`Conversion ${fromCurrency} to ${targetCurrency} will be ${targetAmount}`);
    return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
        console.log(`Conversion ${fromCurrency} to ${targetCurrency} is ${targetAmount}`);
        callback(err, data);
    });
  }
  transferMoney({ to, amount }) {
    console.log(`Transferring ${amount} to ${to}`);
    return ApiConnector.transferMoney({ to, amount }, (err, data) => {
        console.log(`Transferred ${amount} to ${to}`);
        callback(err, data);
    });
  }
};
let currency;
function getCurrency() {
  ApiConnector.getStocks( (err, data) => {
    currency = response;
    callback(err, data);
})
  // В данной функции нужно использовать метод getStocks класса ApiConnector. Сохраните данные, полученные в результате вызова getStocks, в переменную.
}