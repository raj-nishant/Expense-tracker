var expenselist = document.getElementById("expenselist");
var addexpenseBtn = document.getElementById("addexpense");
addexpenseBtn.addEventListener("click", saveExpense);
document.addEventListener("DOMContentLoaded", loadExpenses);
let mode = "newExpense";
async function loadExpenses() {
  const response = await axios.get("http://localhost:5100");
  const data = await response.data;
  try {
    data.forEach((element) => createExpense(element));
  } catch (error) {
    console.log(error);
  }
}

// functions

async function saveExpense(e) {
  e.preventDefault();
  var amount = document.getElementById("Amount").value;
  var description = document.getElementById("description").value;
  var category = document.getElementById("category").value;
  if (amount && description) {
    var expenses = {
      description: description,
      category: category,
      amount: amount,
    };
    if (mode === "newExpense") {
      const response = await axios.post(
        "http://localhost:5100/postExpenses",
        expenses
      );
      const data = await response.data;
      try {
        createExpense(data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const response = await axios.put(
        `http://localhost:5100/updateExpenses/${mode}`,
        expenses
      );
      const data = await response.data;
      try {
        createExpense(data);
        mode = "newExpense";
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    alert("Please fill expenses");
  }
}

function createExpense(details) {
  var li = document.createElement("li");
  var info = document.createTextNode(
    `Rs.${details.amount}-->${details.description}-->${details.category}`
  );
  li.id = details.id;
  li.appendChild(info);

  var delbut = document.createElement("button");
  delbut.className = "btn btn-danger";
  var delinfo = document.createTextNode("DELETE");
  delbut.appendChild(delinfo);
  li.appendChild(delbut);
  delbut.addEventListener("click", deleteExpense);

  var editbut = document.createElement("button");
  editbut.className = "btn btn-dark";
  var editinfo = document.createTextNode("EDIT");
  editbut.appendChild(editinfo);
  li.appendChild(editbut);
  editbut.addEventListener("click", updateExpense);

  expenselist.appendChild(li);

  document.getElementById("Amount").value = "";
  document.getElementById("description").value = "";
}

async function deleteExpense(e) {
  const locate = e.target.parentElement.id;
  const response = await axios.delete(
    `http://localhost:5100/deleteExpenses/${locate}`
  );
  try {
    expenselist.removeChild(e.target.parentElement);
  } catch (error) {
    console.log(error);
  }
}

async function updateExpense(e) {
  const locate = e.target.parentElement.id;
  const response = await axios.get(
    `http://localhost:5100/updateExpenses/${locate}`
  );
  const data = await response.data;
  try {
    expenselist.removeChild(e.target.parentElement);
    document.getElementById("Amount").value = data.amount;
    document.getElementById("description").value = data.description;
    document.getElementById("category").value = data.category;
    mode = data.id;
  } catch (error) {
    console.log(error);
  }
}
