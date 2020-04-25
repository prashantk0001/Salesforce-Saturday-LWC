import getUserDetailsApex from '@salesforce/apex/TodoService.getUserDetails';


const processAllContacts =  (contacts) => {
  console.log(contacts);
};

const processAccounts =  (accounts) => {
  console.log(accounts);

  // process something
  return accounts;
};

const getUserInfo = async () => {
  try {
      let userInfo = await getUserDetailsApex();
      return userInfo;
  } catch (error) {
      console.log(error);
  } finally {
  }
  return null;
}



export {processAllContacts,processAccounts,getUserInfo};