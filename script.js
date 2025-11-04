// Get elements
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const list = document.getElementById("list");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const msg = document.getElementById("motivationalText");
const goalInput = document.getElementById("goalInput");
const setGoalBtn = document.getElementById("setGoal");
const goalProgress = document.getElementById("goalProgress");

// Variables
let income = 0;
let expense = 0;
let balance = 0;
let transactions = [];
let goal = 0;

// Chart setup
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "70%",
  },
});

// Update chart dynamically
function updateChart() {
  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

// Update summary info
function updateSummary() {
  incomeEl.textContent = `₹${income}`;
  expenseEl.textContent = `₹${expense}`;
  balance = income - expense;
  balanceEl.textContent = `₹${balance}`;
  updateChart();

  msg.textContent =
    balance > 0
      ? "💪 Great job! You’re saving well!"
      : "⚠️ Careful! Try to reduce expenses!";

  updateGoalBar();
}

// Add transaction
function addTransaction() {
  const descText = desc.value.trim();
  const amountVal = parseFloat(amount.value);
  const categoryVal = category.value;

  if (!descText || isNaN(amountVal)) return;

  const transaction = {
    id: Date.now(),
    desc: descText,
    amount: amountVal,
    category: categoryVal,
    date: new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }), // shows date & time
  };

  transactions.push(transaction);
  renderTransactions();
  updateValues();

  desc.value = "";
  amount.value = "";
}

// Render transaction list
function renderTransactions() {
  list.innerHTML = "";
  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "income" : "expense");
    li.innerHTML = `
      <span>
        ${t.desc} (${t.category}) ₹${t.amount > 0 ? "+" : ""}${t.amount}<br>
        <small>${t.date}</small>
      </span>
      <button onclick="deleteTransaction(${t.id})">✖</button>
    `;
    list.appendChild(li);
  });
}

// Delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  renderTransactions();
  updateValues();
}

// Update totals
function updateValues() {
  income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  updateSummary();
}

// Set saving goal
function setGoal() {
  const val = parseFloat(goalInput.value);
  if (isNaN(val) || val <= 0) return alert("Enter a valid goal!");
  goal = val;
  updateGoalBar();
}

function updateGoalBar() {
  if (goal > 0) {
    const percent = Math.min((balance / goal) * 100, 100);
    goalProgress.style.width = `${percent}%`;
    goalProgress.style.background = percent >= 100 ? "green" : "#2563eb";
  }
}

addBtn.addEventListener("click", addTransaction);
setGoalBtn.addEventListener("click", setGoal);
