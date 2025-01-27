accounts = [];
balance_history = {};

class Account {
  constructor() {
    this.CurrentBalance = 0;
    this.history = [];
    this.transaction_id = 1;
  }
  add_money(num) {
    this.CurrentBalance = this.CurrentBalance + parseInt(num);
    this.history.push([
      this.transaction_id,
      "Deposit",
      num,
      new Date().toISOString().split("T")[0],
    ]);
    this.transaction_id += 1;
  }
  use_money(num) {
    this.CurrentBalance -= parseInt(num);
    this.history.push([
      this.transaction_id,
      "Withdrawl",
      num,
      new Date().toISOString().split("T")[0],
    ]);
    this.transaction_id += 1;
  }
  get_balance() {
    return this.CurrentBalance;
  }
  get_by_id(id) {
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i][0] === parseInt(id)) {
        return this.history[i];
      }
    }
    return false;
  }

  delete_by_id(id) {
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i][0] === parseInt(id)) {
        if (this.history[i][1] === "Deposit") {
          this.CurrentBalance -= this.history[i][2];
        } else {
          this.CurrentBalance += this.history[i][2];
        }
        console.log("here");
        this.history.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  update_by_id(id, amount, type, date) {
    amount = parseInt(amount);
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i][0] === parseInt(id)) {
        if (this.history[i][1] === "Deposit") {
          this.CurrentBalance -= this.history[i][2];
        } else {
          this.CurrentBalance += this.history[i][2];
        }
        this.history[i][1] = type;
        this.history[i][2] = amount;
        this.history[i][3] = date;
        if (type === "Deposit") {
          this.CurrentBalance += amount;
        } else {
          this.CurrentBalance -= amount;
        }
        return true;
      }
    }
    return false;
  }
}

module.exports = { accounts, balance_history, Account };
