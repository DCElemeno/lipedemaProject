// JS FUNCTIONS FOR ADDING PROGRAMATICALLY TO GOOGLE SHEET
// console.info("grabbed script");

// define stuff...
var API_KEY = 'AIzaSyB9fII5qo7Dyo1NHmpxvTn6hi5jzDpIB1I';
var CLIENT_ID = '729263184577-vdbdaq4iobivfm21ac29jpabke2rsc3b';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
var SPREADSHEET_ID = '1jVHH0Hjs3WRNo8Ry0_YjFQYpXavLRv08ZMjBPED7wrs';
var DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
var RANGE = '';  // syntax: test!A:B (A1 notation)
var VALUES = []; // syntax: [['val 1', 'val 2', ...]]

// makes the actual call  
function makeApiCall() {  
    
    // set body and params
    var body = { values: VALUES };
    var params = {
        spreadsheetId: SPREADSHEET_ID, // from url
        range: RANGE,  // data to be changed (defined above)
        valueInputOption: 'RAW', // vs user entered, this enters just a string
        insertDataOption: 'INSERT_ROWS', // how data is insterted
    };
    
    // make request
    var request = gapi.client.sheets.spreadsheets.values.append(params, body);
    request.then(function(response) {
        console.log(response.result); // maybe do something with response?
    }, function(reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

// intial setup of the client
function initClient() {
    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': DOCS,
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

// set the above values for use
function setConfigVals(csv, range) {
    RANGE = range;
    VALUES = [csv];
}

// helper functions
function handleClientLoad() { gapi.load('client:auth2', initClient); }
function updateSignInStatus(isSignedIn) { if (isSignedIn) { makeApiCall(); }}
function handleSignInClick(event) { console.info(VALUES); gapi.auth2.getAuthInstance().signIn();}
function handleSignOutClick(event) { gapi.auth2.getAuthInstance().signOut(); }
function runTest() { makeApiCall(); }