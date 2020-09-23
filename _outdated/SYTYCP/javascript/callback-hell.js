/**
* @author Kishan Nirghin
* @date 01-09-2017
* @description callbacks can be tricky, here a few tests that can prove you
* understand the concept and overcome difficulties that go paired with it.
*/




/* =============================================================================
    CHALLENGE 1 (solutions at bottom)
     Fill in the sendMailsSequentially function in a way that it sends emails
     In a synchronous manner; That is: an email can only be send after the
     previous one is done.

     (only 1 instance of sendEmail can be active at any time)
============================================================================= */
/*
* @var emailAddresses {type: [String]}
*/
function sendMailsSynchronously(emailAddresses){

}

/*
* @var emailAddress {type: String}
* @var callback - a callback function with no arguments
*/
function sendEmail(emailAddress, callback){
    // ..
    // ..
    // assume this function works and takes some time to finish
    // and call the callback function
    // ..
    // ..
}






























































/* =============================================================================
    SOLUTION CHALLENGE 1
============================================================================= */
function sendMailsSynchronously(emailAddresses){

    var sendEmailRecursively = function(emailAddressesIndex){
        // end condition
        if (emailAddressesIndex == emailAddresses.length){
            return;
        }
        var emailAddress = emailAddresses[emailAddressesIndex];

        // send email and use recursion in the callback function
        sendEmail(emailAddress, function(){
            sendEmailRecursively(emailAddressesIndex+1);
        });
    }

    sendEmailRecursively(0);
}

function sendEmail(emailAddress, callback){
    setTimeout(callback, 1000);
}
