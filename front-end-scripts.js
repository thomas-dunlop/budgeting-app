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
    let newName = document.getElementById(`${nameValue}updateNameInput`).value
    let budgetValue = parseFloat(document.getElementById(`${nameValue}updateBudgetInput`).value);
    let moneyValue = parseFloat(document.getElementById(`${nameValue}updateFundsInput`).value);
    let data = {env_name: newName, env_money: moneyValue, env_budget: budgetValue};

    //Implements PUT fetch command
    try {
        const response = await fetch('http://localhost:3000/envelopes/' + idValue, {
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
        const response = await fetch('http://localhost:3000/envelopes/' + id, {method: 'DELETE'});
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
        const response = await fetch('http://localhost:3000/envelopes')
        if(response.ok) {
            let jsonResponse = await response.json();
            jsonResponse.forEach(element => {
                let envelopeName = element.env_name;
                let envelopeBudget = element.env_budget;
                let envelopeMoney = element.env_money;
                //Creates HTML content for envelope info
                addElement("h2", "name", "Envelope: " + envelopeName);
                addElement("p", "budget", "Monthly Budget: " + envelopeBudget);
                addElement("p", "money", "Funds Remaining: " + envelopeMoney);

                //Creates delete button
                addElement("button", envelopeName + "deleteButton", "Delete Envelope");
                let deleteButton = document.getElementById(envelopeName + "deleteButton");
                deleteButton.setAttribute("onclick", `deleteEnvelopes(${element.id})`);

                addElement("h4", "", "Update Envelope");

                //Adds inputs to update name
                addElement("label", envelopeName + "updateNameLabel", "Name: ");
                let updateNameLabel = document.getElementById(envelopeName + "updateNameLabel");
                updateNameLabel.setAttribute("for", "name");
                addElement("input", envelopeName + "updateNameInput", "");
                let updateNameInput = document.getElementById(envelopeName + "updateNameInput");
                updateNameInput.setAttribute("name", "name");
                updateNameInput.setAttribute("value", envelopeName);
                updateNameInput.setAttribute("type", "text");
                
                const break1 = document.createElement("br");
                document.body.appendChild(break1);

                //Adds inputs to update monthly budget
                addElement("label", envelopeName + "updateBudgetLabel", "Monthly Budget: ");
                let updateBudgetLabel = document.getElementById(envelopeName + "updateBudgetLabel");
                updateBudgetLabel.setAttribute("for", "budget");
                addElement("input", envelopeName + "updateBudgetInput", "");
                let updateBudgetInput = document.getElementById(envelopeName + "updateBudgetInput");
                updateBudgetInput.setAttribute("name", "budget");
                updateBudgetInput.setAttribute("value", envelopeBudget);
                updateBudgetInput.setAttribute("type", "number");
                
                const break2 = document.createElement("br");
                document.body.appendChild(break2);

                //Adds inputs to update remaining funds. 
                addElement("label", envelopeName + "updateFundsLabel", "Funds Remaining: ",);
                let updateFundsLabel = document.getElementById(envelopeName + "updateFundsLabel");
                updateFundsLabel.setAttribute("for", "money");
                addElement("input", envelopeName + "updateFundsInput", "");
                let updateFundsInput = document.getElementById(envelopeName + "updateFundsInput");
                updateFundsInput.setAttribute("name", "money");
                updateFundsInput.setAttribute("value", envelopeMoney);
                updateFundsInput.setAttribute("type", "number");

                const break3 = document.createElement("br");
                document.body.appendChild(break3);

                //Adds a submit button
                addElement("button", envelopeName + "submitButton", "Submit funds or spending");
                let submitFormButton =  document.getElementById(envelopeName + "submitButton");
                submitFormButton.setAttribute("onclick", `updateEnvelope(${element.id}, "${envelopeName}")`);
                
            })
        } else {
            throw new Error('Issue retreiving envelopes.');
        }
    } catch(error) {
        console.log(error);
    }
}