Cypress.on('uncaught:exception', err => {
  if (err.message.includes('Cannot clear timer: timer created with')) {
    return false;
  } else {
    throw err;
  }
});
