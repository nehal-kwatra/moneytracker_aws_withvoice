// Monthly expenses chart
const monthlyCtx = document.getElementById("monthlyChart").getContext("2d");

const monthlyChart = new Chart(monthlyCtx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Expenses",
        data: [2000, 3500, 2800, 4200, 3000, 5000],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
