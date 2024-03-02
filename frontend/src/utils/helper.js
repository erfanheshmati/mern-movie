export const isValidEmail = (email) => {
  const isValidMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isValidMail.test(email);
};
