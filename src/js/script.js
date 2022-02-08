const product = { products: [] };
const error = [];

function submitProductForm() {
  var pid = document.getElementById("r1");
  var pName = document.getElementById("r2");
  var pPrice = document.getElementById("r3");
  if (validateFields(pid, pName, pPrice)) {
    pid.style.borderColor = "black";
    pName.style.borderColor = "black";
    pPrice.style.borderColor = "black";
    if (getProduct(pid.value).length == 0) {
      //Add to JSON
      addToJSON(pid.value, pName.value, pPrice.value);
      console.log(product);
      //Display the Product
      displayInTable(product.products);
    } else {
      document.getElementById("output").innerHTML =
        "<p>Please Change the Product Id, As it is already exist!</p>";
    }
  } else {
    displayError(error);
  }
}

function addToJSON(pid, pName, price) {
  //const productJSON=[];
  product.products.push({ Id: pid, P_Name: pName, Price: price });
  //return productJSON;
}

function displayInTable(pr) {
  var name = `<table>
    <tr><th>Product Id</th><th>Product Name</th><th>Product Price</th><th></th></tr>`;
  for (let i = 0; i < pr.length; i++) {
    name += `<tr><td>${pr[i].Id}</td><td>${pr[i].P_Name}</td><td>${pr[i].Price}</td><td><a href="#" onclick="editProd(${pr[i].Id})">Edit</a>/<a href="#" onclick="deleteProd(${pr[i].Id})">Delete</a></td></tr>`;
  }
  name += `</table>`;
  document.getElementById("output").innerHTML = name;
}

function validateFields(pid, pName, pPrice) {
  var flag = true;
  if (pid.value.length <= 1) {
    error.push({ type: "Please Enter a Valid Product Id" });
    pid.style.borderColor = "red";
    flag = false;
  } else if (pName.value.length < 2) {
    error.push({ type: "Please Enter a Valid Product Name" });
    pName.style.borderColor = "red";
    flag = false;
  } else if (pPrice.value.length <= 1) {
    error.push({ type: "Please Enter a Valid Product Price" });
    pPrice.style.borderColor = "red";
    flag = false;
  } else {
    //pPrice.style.borderColor = "black";
    error.shift();
  }

  return flag;
}
//display the error
function displayError(error) {
  var errMsg = ""; //Containes All The Error Messages
  for (let i = 0; i < error.length; i++) {
    errMsg += `<p>${error[i].type}</p>`;
  }
  document.getElementById("output").innerHTML = errMsg; // Setting the Error Message to output

  error.length = 0; //Making the error free for again checking.
}

function editProd(pid) {
  document.getElementById("submitBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "block";
  var prod = getProduct(pid);
  var Pid = document.getElementById("r1");
  var pName = document.getElementById("r2");
  var pPrice = document.getElementById("r3");
  //  console.log( typeof(pid));
  Pid.value = prod[0].Id;
  pName.value = prod[0].P_Name;
  pPrice.value = prod[0].Price;

  Pid.readOnly = true;
}

function deleteProd(pid) {
  const prod = product.products.filter((element, idx) => {
    return element.Id !== String(pid);
  });
  product.products = prod;
  displayInTable(product.products);
}

function getProduct(pid) {
  const pr = product.products.filter((element, idx) => {
    return element.Id === String(pid);
  });
  // console.log(pr);
  return pr;
}
//Weight Form
const werror = [];
function submitWForm() {
  var name = document.getElementById("name");
  var age = document.getElementById("age");
  var weight = document.getElementById("weight");

  if (validateWeightForm(name, age, weight)) {
    const obj = [{ Name: name.value, Age: age.value, Weight: weight.value }];
    name.style.borderColor = "black";
    age.style.borderColor = "black";
    weight.style.borderColor = "black";
    ageChecker(obj);
    console.log(obj);
  } else {
    displayError(werror);
  }
}

//validate the weight Form
function validateWeightForm(name, age, weight) {
  if (name.value.length <= 0 || !isNaN(name.value)) {
    werror.push({ type: "Please Enter a Valid Name" });
    name.style.borderColor = "red";
    return false;
  } else if (age.value.length <= 0 || isNaN(age.value)) {
    werror.push({ type: "Please Enter a Valid age" });
    age.style.borderColor = "red";
    return false;
  } else if (weight.value.length <= 0 || isNaN(weight.value)) {
    werror.push({ type: "Please Enter a Valid weight" });
    weight.style.borderColor = "red";
    return false;
  }
  return true;
}

//Check the age
function ageChecker(obj) {
  var a = obj[0].Age;
  var n = obj[0].Name;
  if (a >= 5 && a <= 7) {
    weigthChecker(obj, 15, 20);
  } else if (a >= 8 && a <= 10) {
    weigthChecker(obj, 21, 25);
  } else if (a >= 11 && a <= 15) {
    weigthChecker(obj, 26, 30);
  } else if (a >= 16 && a <= 20) {
    weigthChecker(obj, 31, 40);
  } else {
    displayMsg(`Hello ${n}!!! Age not defined.`);
  }
}

//display Message
function displayMsg(msg) {
  document.getElementById("output").innerHTML = `<p>${msg}</p>`;
}

//check the weights
function weigthChecker(obj, w1, w2) {
  var w = obj[0].Weight;
  if (w <= w2 && w >= w1) {
    displayMsg(`Hello ${obj[0].Name}!!! Your Weight is perfect.`);
  } else if (w > w2) {
    displayMsg(
      `Hello ${obj[0].Name}!!! Your weight is greater than the recommanded value of ${obj[0].Weight}KG at an age of ${obj[0].Age}`
    );
  } else if (w < w1) {
    displayMsg(
      `Hello ${obj[0].Name}!!! Your weight is less than the recommanded value of ${obj[0].Weight}KG at an age of ${obj[0].Age}`
    );
  }
}
