const formControls = document.querySelectorAll(".form__control");
const contactForm = document.getElementById("contactForm");

//submnit form
const submitForm = (e) => {
    e.preventDefault();
    let hasError = "";
    for (let i = 0; i < formControls.length; i++) {
        hasError += validate(formControls[i]);
    }
    if (hasError) {
        return;
    }
    sendEmail(e);
}

// submit form data to my email
const sendEmail = async (e) => {
    var data = new FormData(e.target);
    fetch(e.target.action, {
        method: contactForm.method,
        body: data,
        headers: {
            'Accept': 'application/json',
        }
    }).then(response => {
        console.log(response);
        if (response.status === 200) {
            showToaster();
            contactForm.reset();
        }
    }).catch(error => {
        console.log(error, "Oops! There was a problem submitting your form");
    });

}


const validate = (formControl) => {
    let formControlValue = formControl.value.trim();
    let errorMessage = "";

    // validate required fields
    if (!formControlValue) {
        formControl.classList.add("form__error");
        formControl.nextElementSibling.innerHTML = "This field is required";
        errorMessage += formControl.nextElementSibling.innerHTML
    }

    // validate max characters
    if (formControlValue && formControlValue.length <= 6) {
        formControl.classList.add("form__error");
        formControl.nextElementSibling.innerHTML = "Give at least 7 characters";
        errorMessage += formControl.nextElementSibling.innerHTML
    }

    // validate email address
    if (formControl.id === "email" && formControlValue) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formControlValue)) {
            formControl.classList.remove("form__error");
            formControl.nextElementSibling.innerHTML = "";
            errorMessage += formControl.nextElementSibling.innerHTML
        } else {
            alert("Not a valid form control");
            formControl.classList.add("form__error");
            formControl.nextElementSibling.innerHTML = "Please use a valid email address";
            errorMessage += formControl.nextElementSibling.innerHTML
        }
    }

    // validate phone number
    if (formControl.id === "phoneNumber" && formControlValue) {
        if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g.test(formControlValue)) {
            formControl.classList.remove("form__error");
            formControl.nextElementSibling.innerHTML = "";
            errorMessage += formControl.nextElementSibling.innerHTML
        } else {
            formControl.classList.add("form__error");
            formControl.nextElementSibling.innerHTML = "Invalid Phone Number Format";
            errorMessage += formControl.nextElementSibling.innerHTML
        }
    }

    // if no error reset field styling
    if (errorMessage === "") {
        formControl.classList.remove("form__error");
        formControl.nextElementSibling.innerHTML = "";
        errorMessage += formControl.nextElementSibling.innerHTML
    }

    // return error message
    return errorMessage;
}

const showToaster = () => {
    const toaster = document.getElementById("toaster");
    toaster.classList.add("fade-in");
    setTimeout(() => {
        toaster.classList.remove("fade-in");
        toaster.classList.add("fade-out");
    }, 7000)
}

