//Function for adding elements of any type to the DOM
const addElement = (type, id, text) => {
    const newElement = document.createElement(type);
    newElement.innerHTML = text;
    newElement.setAttribute("id", id);
    document.body.appendChild(newElement);
}

//Function for updating a specific envelope
const updateEnvelope = async (idValue, nameValue) => {
    //Retrieves update values from HTML input elements. 
    let budgetValue = parseFloat(document.getElementById(`${nameValue}updateBudgetInput`).value);
    let moneyValue = parseFloat(document.getElementById(`${nameValue}updateFundsInput`).value);
    let data = {money: moneyValue, budget: budgetValue};

    //Implements PUT fetch command
    try {
        const response = await fetch('http://localhost:3000/' + idValue, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            window.location.reload();
        } else {
            throw new Error('Failed to update envelope.')
        }
    } catch(error) {
        console.log(error);
    }
}

//Function for deleting specific envelopes. 
const deleteEnvelopes = async (id) => {
    try {
        const response = await fetch('http://localhost:3000/' + id, {method: 'DELETE'});
            if(response.ok) {
                window.location.reload();
            } else {
                throw new Error('Issue deleting envelope');
            }
        } catch (error) {
            console.log(error);
        }
}

//Function used for retrieving all envelopes from the server (mainly used on page load);
const getEnvelopes = async () => {
    try {
        const response = await fetch('http://localhost:3000/')
        if(response.ok) {
            let jsonResponse = await response.json();
            jsonResponse.forEach(element => {
                //Creates HTML content for envelope info
                addElement("h2", "name", "Envelope: " + element.name);
                addElement("p", "money", "Funds Remaining: " + element.money);
                addElement("p", "budget", "Monthly Budget: " + element.budget);

                //Creates delete button
                addElement("button", element.name + "deleteButton", "Delete Envelope");
                let deleteButton = document.getElementById(element.name + "deleteButton");
                deleteButton.setAttribute("onclick", `deleteEnvelopes(${element.id})`);

                addElement("h4", "", "Update Envelope");

                //Adds inputs to update monthly budget
                addElement("label", element.name + "updateBudgetLabel", "Monthly Budget: ");
                let updateBudgetLabel = document.getElementById(element.name + "updateBudgetLabel");
                updateBudgetLabel.setAttribute("for", "budget");
                addElement("input", element.name + "updateBudgetInput", "");
                let updateBudgetInput = document.getElementById(element.name + "updateBudgetInput");
                updateBudgetInput.setAttribute("name", "budget");
                updateBudgetInput.setAttribute("value", element.budget);
                updateBudgetInput.setAttribute("type", "number");
                
                const break1 = document.createElement("br");
                document.body.appendChild(break1);

                //Adds inputs to update remaining funds. 
                addElement("label", element.name + "updateFundsLabel", "Funds Remaining: ",);
                let updateFundsLabel = document.getElementById(element.name + "updateFundsLabel");
                updateFundsLabel.setAttribute("for", "money");
                addElement("input", element.name + "updateFundsInput", "");
                let updateFundsInput = document.getElementById(element.name + "updateFundsInput");
                updateFundsInput.setAttribute("name", "money");
                updateFundsInput.setAttribute("value", element.money);
                updateFundsInput.setAttribute("type", "number");

                const break2 = document.createElement("br");
                document.body.appendChild(break2);

                //Adds a submit button
                addElement("button", element.name + "submitButton", "Submit funds or spending");
                let submitFormButton =  document.getElementById(element.name + "submitButton");
                submitFormButton.setAttribute("onclick", `updateEnvelope(${element.id}, "${element.name}")`);
                
            })
        } else {
            throw new Error('Issue retreiving envelopes.');
        }
    } catch(error) {
        console.log(error);
    }
}