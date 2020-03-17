'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = function() {
  ApiConnector.logout( (response) => {
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

setInterval(getRatesBoard, 1000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
    } else { 
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(false, `You have successfully added ${data.amount} ${data.currency}!`);
    }    
  })
};

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
    } else {  
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(false, `You have successfully converted ${data.amount} ${data.currency}!`);
    }    
  })
};

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if(!response.success) { 
      moneyManager.setMessage(true, response.data);
    } else {  
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(false, `You have successfully sended ${data.amount} ${data.currency}!`);
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
      console.log(data) 
      moneyManager.setMessage(false, `You have successfully added username ${data.name} id ${data.id}  for your Favorite list!`);
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
      console.log(data);
      console.log(response);
      moneyManager.setMessage(false, `You have successfully removed user id ${data} from your Favorite list.`);
    }  
  })
}