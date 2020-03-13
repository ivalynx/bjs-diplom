'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = function() {
  ApiConnector.logout( () => {
    if(response.success) {
      location.reload();
    }
  })
};

function getCurrentUser() {
  ApiConnector.current( (response) => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
    }
  });
}

getCurrentUser();

const ratesBoard = new RatesBoard();

function getRatesBoard() {
  ApiConnector.getStocks( (response) => {
    if(response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data)
    }
  });
}

setInterval(getRatesBoard(), 1000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
    } else { 
      console.log(response);
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(null, `Success!`);
    }    
  })
};

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
    } else {  
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(null, `Success!`);
    }    
  })
};

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
    } else {  
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(null, `Success!`);
    }    
  })
};

const favoritesWidget = new FavoritesWidget();

function getFavoritesUsers() {
  ApiConnector.getFavorites( (response) => {
    if(response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
    }
  });
}
getFavoritesUsers();

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
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
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
    } else {        
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);      
      moneyManager.setMessage(null, `Success!`);
    }  
  })
}