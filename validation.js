export function validateForm(data) {
    console.log("Server side validation happens here");
    console.log(data);

    //Store error messages in an array
    const errors = [];

    //Validate first name
    if(data.fname.trim() == "") {
        errors.push("First name is required!");
    }

    //Validate last name
    if(data.lname.trim() == "") {
        errors.push("Last name is required!");
    }

    //Validate how we met
    const validMeetOptions = ['LinkedIn', 'School', 'MinT', 'Event', 'Other'];
    
    if(!validMeetOptions.includes(data.meet)) {
        errors.push("Please select a valid 'How we met' option!");
    }

    //Valid email format if mailing list is checked
    if(data['mailing-list'] === "on") {
        const validFormats = ['html' , 'text'];

        if(!data.format || !validFormats.includes(data.format)) {
            errors.push("Please select an email format!");
        }

        if (data.email.trim() == "") {
            errors.push("Email is required if you want to join the mailing list!");
        }
    }

    console.log(errors);
    return {
        isValid: errors.length === 0,
        errors
    };


}