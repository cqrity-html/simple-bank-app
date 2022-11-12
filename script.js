"use strict";

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2021-10-02T14:43:31.074Z',
    '2021-10-29T11:24:19.761Z',
    '2021-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-09-09T11:42:26.371Z',
    '2022-11-08T07:43:59.331Z',
    '2022-11-10T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2021-10-02T14:43:31.074Z',
    '2021-10-29T11:24:19.761Z',
    '2021-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-03-09T11:42:26.371Z',
    '2022-05-21T07:43:59.331Z',
    '2022-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2021-10-02T14:43:31.074Z',
    '2021-10-29T11:24:19.761Z',
    '2021-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-03-09T11:42:26.371Z',
    '2022-05-21T07:43:59.331Z',
    '2022-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2021-10-02T14:43:31.074Z',
    '2021-10-29T11:24:19.761Z',
    '2021-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-03-09T11:42:26.371Z',
    '2022-05-21T07:43:59.331Z',
    '2022-06-22T15:21:20.814Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2021-10-02T14:43:31.074Z',
    '2021-10-29T11:24:19.761Z',
    '2021-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-03-09T11:42:26.371Z',
    '2022-05-21T07:43:59.331Z',
    '2022-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelDate = document.querySelector(".date");
const labelTimer = document.querySelector(".timer");

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

let currentAccount, currentLogOutTimer;
let transactionsSorted = false;
const now = new Date();

const dateOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

const generateNickname = (account) => {
  account.nickName = account.userName
    .toLowerCase()
    .split(" ")
    .map((word) => word[0])
    .join("");
};

accounts.forEach((account) => generateNickname(account));

const getDaysBetween2Dates = (date1, date2) => {
  const getDaysBetween2Dates = Math.trunc((date2 - date1) / (1000 * 60 * 60 * 24));
  if (getDaysBetween2Dates === 0) { return 'сегодня' }
  else if (getDaysBetween2Dates === 1) { return 'вчера' }
  else if (getDaysBetween2Dates <= 5) { return `${getDaysBetween2Dates} дня назад` }
  else { return `${new Intl.DateTimeFormat(currentAccount.locale, dateOptions).format(date1)}` }
};

const formatCurrency = (value, locale, currency) => new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);

const generateTransactionsList = function (account, sort = false) {
  containerTransactions.innerHTML = "";
  const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions;

  transacs.forEach((transaction, index) => {
    const transactionDate = new Date(account.transactionsDates[index]);
    containerTransactions.insertAdjacentHTML(
      "afterbegin",
      `<div class="transactions__row">
        <div class="transactions__type transactions__type--${transaction > 0 ? "deposit" : "withdrawal"
      }">
          ${index + 1} ${transaction > 0 ? "депозит" : "вывод средств"}
        </div>
        <div class="transactions__date">${getDaysBetween2Dates(transactionDate, now)}</div>
        <div class="transactions__value">${formatCurrency(transaction, account.locale, account.currency)}</div>
      </div>`
    );
    if (index % 2 !== 0) {
      document.querySelector('.transactions__row').style.backgroundColor = '#dcdcdc';
    }
  });
};

const displayBalance = function (account) {
  const currentBalance = account.transactions.reduce((acc, trans) => (acc += trans), 0);
  account.currentBalance = currentBalance;
  labelBalance.textContent = formatCurrency(account.currentBalance, account.locale, account.currency);
};

const displayTotals = function (account) {
  const sumIn = account.transactions.filter((trans) => trans > 0).reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(sumIn, account.locale, account.currency);
  const sumOut = account.transactions.filter((trans) => trans < 0).reduce((acc, trans) => Math.abs(acc + Math.abs(trans)), 0);
  labelSumOut.textContent = formatCurrency(sumOut, account.locale, account.currency);
  const interest = account.transactions.filter((trans) => trans > 0).map((depos) => (depos * 1.1) / 100).reduce((acc, trans) => acc + trans, 0);
  labelSumInterest.textContent = formatCurrency(interest, account.locale, account.currency);
};

const updateUI = function () {
  generateTransactionsList(currentAccount);
  displayBalance(currentAccount);
  displayTotals(currentAccount);
}

const logOut = function () {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Войдите в свой аккаунт';
  inputLoginUsername.classList.remove("hidden");
  inputLoginPin.classList.remove("hidden");
  btnLogin.classList.remove("hidden");
};

const startLogoutTimer = function () {
  // Установить время выхода через 5 минут
  let time = 300;

  const logOutTimerCallback = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    // В каждом вызове показывать оставшееся время в UI
    labelTimer.textContent = `${minutes}:${seconds}`;

    // После истечения времени остановить таймер и выйти из приложения
    if (time === 0) {
      clearInterval(logOutTimer);
      logOut();
    }

    time--;
  };

  // Вызов таймера каждую секунду
  logOutTimerCallback();
  const logOutTimer = setInterval(logOutTimerCallback, 1000);

  return logOutTimer;
};

btnLogin.addEventListener("click", function (evt) {
  evt.preventDefault();
  currentAccount = accounts.find(account => account.nickName === inputLoginUsername.value
    && +inputLoginPin.value === account.pin
  );
  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, dateOptions).format(now);
  if (currentLogOutTimer) clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
  updateUI();
  inputLoginUsername.classList.add("hidden");
  inputLoginPin.classList.add("hidden");
  btnLogin.classList.add("hidden");
  labelWelcome.textContent = `Добро пожаловать, ${currentAccount.userName.split(' ')[0]}!`;
  containerApp.style.opacity = 1;
}
);

const transferDate = new Date().toISOString();

btnTransfer.addEventListener("click", function (evt) {
  evt.preventDefault();
  const personToTransferTo = accounts.find(account => account.nickName === inputTransferTo.value);
  if (
    +inputTransferAmount.value > 0
    && +inputTransferAmount.value <= currentAccount.currentBalance
    && personToTransferTo
    && personToTransferTo.nickName !== currentAccount.nickName) {
    personToTransferTo.transactions.push(+inputTransferAmount.value);
    currentAccount.transactions.push(-Number(inputTransferAmount.value));
    personToTransferTo.transactionsDates.push(transferDate);
    currentAccount.transactionsDates.push(transferDate);
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
    updateUI();
    formTransfer.reset();
  } else {
    formTransfer.reset();
  }
}
);

btnLoan.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (+inputLoanAmount.value > 0
    && currentAccount.transactions.some(trans => Math.abs(trans) > +inputLoanAmount.value / 10)) {
    setTimeout(() => {
      currentAccount.transactions.push(Math.floor(inputLoanAmount.value));
      currentAccount.transactionsDates.push(transferDate);
      updateUI();
      formLoan.reset();
    }, 5000);
  } else {
    formLoan.reset();
  }
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
}
);

btnClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.nickName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex((account) => account.nickName === currentAccount.nickName);
    accounts.splice(currentAccountIndex, 1);
    logOut();
  }
}
);

btnSort.addEventListener("click", function (evt) {
  evt.preventDefault();
  transactionsSorted = !transactionsSorted;
  generateTransactionsList(currentAccount, transactionsSorted);
}
);

// setInterval(() => {
//   const now = new Date();
//   console.log(now.getSeconds());
// }, 3000);
