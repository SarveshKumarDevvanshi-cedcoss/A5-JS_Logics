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
    //Add to JSON
    addToJSON(pid.value, pName.value, pPrice.value);
    console.log(product);
    //Display the Product
    displayInTable(product.products);
  } else {
    var errMsg = ""; //Containes All The Error Messages
    for (let i = 0; i < error.length; i++) {
      errMsg += `<p>${error[i].type}</p>`;
    }
    document.getElementById("output").innerHTML = errMsg; // Setting the Error Message to output
    
    error.length = 0; //Making the error free for again checking.
    
  }
}

function addToJSON(pid, pName, price) {
  //const productJSON=[];
  product.products.push({ Id: pid, P_Name: pName, Price: price });
  //return productJSON;
}

function displayInTable(pr) {
  var name = `<table>
    <tr><th>Product Id</th><th>Product Name</th><th>Product Price</th></tr>`;
  for (let i = 0; i < pr.length; i++) {
    name += `<tr><td>${pr[i].Id}</td><td>${pr[i].P_Name}</td><td>${pr[i].Price}</td></tr>`;
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
  } 
  else if (pName.value.length < 2) {
    error.push({ type: "Please Enter a Valid Product Name" });
    pName.style.borderColor = "red";
    flag = false;
  } 
  else if (pPrice.value.length <= 1) {
    error.push({ type: "Please Enter a Valid Product Price" });
    pPrice.style.borderColor = "red";
    flag = false;
  } else {
    //pPrice.style.borderColor = "black";
    error.shift();
  }

  return flag;
}
