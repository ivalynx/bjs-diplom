'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = function() {
  ApiConnector.logout( () => {
    if(true) {
      location.reload();
    }
  })
};

function getCurrentUser() {
  ApiConnector.current( (response) => {
    if(true) {
      ProfileWidget.showProfile(response.data);
    }
  });
}

getCurrentUser();

const ratesBoard = new RatesBoard();

function getRatesBoard() {
  ApiConnector.getStocks( (response) => {
    if(true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data)
    }
  });
}

setInterval(getRatesBoard(), 1000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if(false) { 
      moneyManager.setMessage(isError, message);
    } else {  
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(null, `Success!`);
    }    
  })
};

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if(false) { 
      moneyManager.setMessage(isError, message);
    } else {  
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(null, `Success!`);
    }    
  })
};

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if(false) { 
      moneyManager.setMessage(isError, message);
    } else {  
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(null, `Success!`);
    }    
  })
};

const favoritesWidget = new FavoritesWidget();

function getFavoritesUsers() {
  ApiConnector.getFavorites( (response) => {
    if(true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });
}
getFavoritesUsers();

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if(false) { 
      moneyManager.setMessage(isError, message);
    } else {        
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);      
      moneyManager.setMessage(null, `Success!`);
    }  
  })
}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if(false) { 
      moneyManager.setMessage(isError, message);
    } else {        
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);      
      moneyManager.setMessage(null, `Success!`);
    }  
  })
}