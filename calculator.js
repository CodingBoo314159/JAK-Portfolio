let base = 0;
let totalCost = [];
let counter = 0;

// Piecewise function
function f(x) {
    if (x > 80 && x <= 100) {
        return 0.12 * x - 0.24;
    } else if (x > 70 && x <= 80) {
        return 0.09 * x + 2.16;
    } else if (x > 60 && x <= 70) {
        return 0.15 * x - 2.04;
    } else if (x >= 40 && x <= 60) {
        return 0.12 * x - 0.24;
    } else {
        alert("Invalid Percentage");
        return 0;
    }
}

// Calculate weekly base
function calculateBase() {
    let totalSecond = parseInt(document.getElementById("priorSecond").value);
    let totalAddies = parseInt(document.getElementById("priorAddies").value);

    let perc = (totalSecond / totalAddies) * 100;
    base = f(perc);

    document.getElementById("baseRate").innerText = base.toFixed(2);
}

// Extra payment functions
function extra_ID(x) { return x ? 2 : 0; }
function extra_email(x) { return x ? 1 : 0; }
function extra_third(x) { return x ? 2 : 0; }
function extra_home(x) { return x ? 0.5 : 0; }
function extra_account(x) { return x ? 5 : 0; }
function extra_piq(x) { return x ? 4 : 0; }
function extra_bank(x) { return x ? 1 : 0; }
function extra_medical(x) { return x ? 1.25 : 0; }

function mult(x) {
    return x ? 1.3 : 0.7;
}

// Add Address
function addAddress() {
    counter++;

    let Id = document.getElementById("id").checked;
    let Email = document.getElementById("email").checked;
    let Third = document.getElementById("third").checked;
    let Home = document.getElementById("home").checked;
    let Account = document.getElementById("account").checked;
    let PIQ = document.getElementById("piq").checked;
    let Bank = document.getElementById("bank").checked;
    let Medical = document.getElementById("medical").checked;

    let multiplier = mult(Id);

    let extras_total =
        extra_ID(Id) +
        extra_email(Email) +
        extra_third(Third) +
        extra_home(Home) +
        extra_account(Account) +
        extra_piq(PIQ) +
        extra_bank(Bank) +
        extra_medical(Medical);

    let addie_pay = (base + extras_total) * 1.06 * multiplier;

    totalCost.push(addie_pay);

    let running_total = totalCost.reduce((a, b) => a + b, 0);
    document.getElementById("runningTotal").innerText =
        running_total.toFixed(2);

    // Save to localStorage
    localStorage.setItem("payData", JSON.stringify(totalCost));

    let addressData = JSON.parse(localStorage.getItem("addressData") || "[]");
    addressData.push({Id, Email, Third, Home, Account, PIQ, Bank, Medical, pay: addie_pay});
    localStorage.setItem("addressData", JSON.stringify(addressData));

    // Add row to table
    let table = document.getElementById("addressTable").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow();

    newRow.insertCell(0).innerText = counter;
    newRow.insertCell(1).innerText = Id ? "✔" : "";
    newRow.insertCell(2).innerText = Email ? "✔" : "";
    newRow.insertCell(3).innerText = Third ? "✔" : "";
    newRow.insertCell(4).innerText = Home ? "✔" : "";
    newRow.insertCell(5).innerText = Account ? "✔" : "";
    newRow.insertCell(6).innerText = PIQ ? "✔" : "";
    newRow.insertCell(7).innerText = Bank ? "✔" : "";
    newRow.insertCell(8).innerText = Medical ? "✔" : "";
    newRow.insertCell(9).innerText = addie_pay.toFixed(2);

    // Show Calculation button
    let calcCell = newRow.insertCell(10);
    let btn = document.createElement("button");
    btn.innerText = "Show Calc";
btn.onclick = function() {
    // Create a string showing which extras are included
    let extras_text = [
        Id ? `ID: ${extra_ID(Id)}` : "",
        Email ? `Email: ${extra_email(Email)}` : "",
        Third ? `3rd: ${extra_third(Third)}` : "",
        Home ? `Home: ${extra_home(Home)}` : "",
        Account ? `Account: ${extra_account(Account)}` : "",
        PIQ ? `PIQ: ${extra_piq(PIQ)}` : "",
        Bank ? `Bank: ${extra_bank(Bank)}` : "",
        Medical ? `Medical: ${extra_medical(Medical)}` : ""
    ].filter(x => x !== "").join(" + ");

    // Step by step math
    let step1 = (base + extras_total).toFixed(2);
    let step2 = (step1 * 1.06).toFixed(2); // multiply by 1.06
    let step3 = (step2 * multiplier).toFixed(2); // multiply by multiplier

    alert(
        `Calculation:\n\n` +
        `Base + Extras = ${base.toFixed(2)} + ${extras_total.toFixed(2)} = ${step1}\n` +
        `Step 1 × 1.06 = ${step1} × 1.06 = ${step2}\n` +
        `Step 2 × Multiplier = ${step2} × ${multiplier} = ${step3}\n\n` +
        `Total Pay: R${step3}`
    );
};

    calcCell.appendChild(btn);

    // Clear checkboxes
    document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
}

// Load data on page load
window.onload = function() {
    totalCost = JSON.parse(localStorage.getItem("payData") || "[]");
    let running_total = totalCost.reduce((a,b)=>a+b,0);
    document.getElementById("runningTotal").innerText = running_total.toFixed(2);

    let addressData = JSON.parse(localStorage.getItem("addressData") || "[]");
    let table = document.getElementById("addressTable").getElementsByTagName("tbody")[0];
    counter = 0;

    addressData.forEach(addr => {
        counter++;
        let newRow = table.insertRow();
        newRow.insertCell(0).innerText = counter;
        newRow.insertCell(1).innerText = addr.Id ? "✔" : "";
        newRow.insertCell(2).innerText = addr.Email ? "✔" : "";
        newRow.insertCell(3).innerText = addr.Third ? "✔" : "";
        newRow.insertCell(4).innerText = addr.Home ? "✔" : "";
        newRow.insertCell(5).innerText = addr.Account ? "✔" : "";
        newRow.insertCell(6).innerText = addr.PIQ ? "✔" : "";
        newRow.insertCell(7).innerText = addr.Bank ? "✔" : "";
        newRow.insertCell(8).innerText = addr.Medical ? "✔" : "";
        newRow.insertCell(9).innerText = addr.pay.toFixed(2);

        // Show Calculation button
        let calcCell = newRow.insertCell(10);
        let btn = document.createElement("button");
        btn.innerText = "Show Calc";
        btn.onclick = function() {
            alert(
                `Base: R${base.toFixed(2)}\n` +
                `Extras:\n` +
                `  ID: ${extra_ID(addr.Id)}\n` +
                `  Email: ${extra_email(addr.Email)}\n` +
                `  3rd: ${extra_third(addr.Third)}\n` +
                `  Home: ${extra_home(addr.Home)}\n` +
                `  Account: ${extra_account(addr.Account)}\n` +
                `  PIQ: ${extra_piq(addr.PIQ)}\n` +
                `  Bank: ${extra_bank(addr.Bank)}\n` +
                `  Medical: ${extra_medical(addr.Medical)}\n` +
                `Multiplier: ${mult(addr.Id)}\n` +
                `Final Address Pay: R${addr.pay.toFixed(2)}`
            );
        };
        calcCell.appendChild(btn);
    });
};

