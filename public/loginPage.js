'use strict';

const userForm = new UserForm();
userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
      if(response.success) {
        location.reload();
      } else {
        userForm.setLoginErrorMessage(response.data);
      }
  })
};
userForm.registerFormCallback = data => {
  return ApiConnector.register(data, response => {
    if(response.success) {
      location.reload();
    }
    userForm.setRegisterErrorMessage(response.data);
  });
}
