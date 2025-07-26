

const actionHandlers = {
    REQ_TIME_OFF: handleTimeOffRequest,
    CHECK_VACATION_DAYS: handleVacationCheck,
    GET_DOCUMENTS: handleDocumentAccess,
    GET_POLICY_INFO: handlePolicyInfo,
    SUBMIT_HR_TICKET: handleHRTicket,
    CONTACT_HUMAN: handleHumanRedirect,
};

function processBotMessage(message) {
    for (const action of Object.keys(actionHandlers)) {
        if (message.includes(action)) {
            // Ejecuta el handler correspondiente
            const handler = actionHandlers[action];
            handler();            
        }
    }

    console.log("No se encontró ninguna acción en el mensaje.");
}

function handleTimeOffRequest(){
    console.log("Solicitud realizada a recursos humanos");
}

function handleDocumentAccess(){

}

function handleVacationCheck(){

}

function handlePolicyInfo(){

}

function handleHRTicket(){

}

function handleHumanRedirect(){

}

module.exports = {processBotMessage};