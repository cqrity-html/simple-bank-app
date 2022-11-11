"use strict";

// Simply Bank App

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");

//const labelDate = document.querySelector(".date");
//const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formTransfer = document.querySelector(".form--transfer");
const formLoan = document.querySelector(".form--loan");

let currentAccount;
let transactionsSorted = false;

const generateNickname = (account) => {
  account.nickName = account.userName
    .toLowerCase()
    .split(" ")
    .map((word) => word[0])
    .join("");
};

accounts.forEach((account) => generateNickname(account));

const generateTransactionsList = function (account, sort = false) {
  containerTransactions.innerHTML = "";

  const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions;

  transacs.forEach((transaction, index) => {
    containerTransactions.insertAdjacentHTML(
      "afterbegin",
      `<div class="transactions__row">
        <div class="transactions__type transactions__type--${transaction > 0 ? "deposit" : "withdrawal"
      }">
          ${index + 1} ${transaction > 0 ? "депозит" : "вывод средств"}
        </div>
        <div class="transactions__value">${transaction}$</div>
      </div>`
    );
  });
};

const displayBalance = function (account) {
  const currentBalance = account.transactions.reduce((acc, trans) => (acc += trans), 0);
  account.currentBalance = currentBalance;
  labelBalance.textContent = `${currentBalance}$`;
};

const displayTotals = function (account) {
  labelSumIn.textContent = `${account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0)}$`;
  labelSumOut.textContent = `${account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => Math.abs(acc + Math.abs(trans)), 0)}$`;
  labelSumInterest.textContent = `${account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * 1.1) / 100)
    .reduce((acc, trans) => acc + trans, 0)}$`;
};

const updateUI = function () {
  generateTransactionsList(currentAccount);
  displayBalance(currentAccount);
  displayTotals(currentAccount);
}

btnLogin.addEventListener("click", function (evt) {
  evt.preventDefault();
  currentAccount = accounts.find(account => account.nickName === inputLoginUsername.value
    && Number(inputLoginPin.value) === account.pin
  );
  updateUI();
  inputLoginUsername.classList.add("hidden");
  inputLoginPin.classList.add("hidden");
  btnLogin.classList.add("hidden");
  labelWelcome.textContent = `Добро пожаловать, ${currentAccount.userName.split(' ')[0]}!`;
  containerApp.style.opacity = 1;
}
);

btnTransfer.addEventListener("click", function (evt) {
  evt.preventDefault();
  const personToTransferTo = accounts.find(account => account.nickName === inputTransferTo.value);
  if (
    Number(inputTransferAmount.value) > 0
    && Number(inputTransferAmount.value) <= currentAccount.currentBalance
    && personToTransferTo
    && personToTransferTo.nickName !== currentAccount.nickName) {
    personToTransferTo.transactions.push(Number(inputTransferAmount.value));
    currentAccount.transactions.push(-Number(inputTransferAmount.value));
    updateUI();
    formTransfer.reset();
  } else {
    formTransfer.reset();
  }
}
);

btnLoan.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (Number(inputLoanAmount.value) > 0
    && currentAccount.transactions.some(trans => Math.abs(trans) > Number(inputLoanAmount.value) / 10)) {
    currentAccount.transactions.push(Number(inputLoanAmount.value));
    updateUI();
    formLoan.reset();
  } else {
    formLoan.reset();
  }
}
);

btnClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.nickName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex((account) => account.nickName === currentAccount.nickName);
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт';
    inputLoginUsername.classList.remove("hidden");
    inputLoginPin.classList.remove("hidden");
    btnLogin.classList.remove("hidden");
  }
}
);

btnSort.addEventListener("click", function (evt) {
  evt.preventDefault();
  transactionsSorted = !transactionsSorted;
  generateTransactionsList(currentAccount, transactionsSorted);
}
);
