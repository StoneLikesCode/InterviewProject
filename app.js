//Select DOM elements
const userForm = document.getElementById("user-form");
const userList = document.getElementById("user-list");
const feedback = document.getElementById("feedback");

//handle form submission 
userForm.addEventListener('submit', function(event) { 
    event.preventDefault(); // prevent page refresh 
    
    //get the name & email field 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const trimmedName = name.toLowerCase().trim();
    const trimmedEmail = email.toLowerCase().trim();

    //JSON-LD for logging, external refrences 
    const userJSONLD = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "email": email
    };
    
    //Search the user list for the name and email of the form submission
    let userInList = false; 
    const listItems = userList.getElementsByTagName('li');
    for(let item of listItems){ 
        if(item.textContent.toLowerCase().includes(trimmedName) && 
        item.textContent.toLowerCase().includes(trimmedEmail)){ 
            userInList = true;
            break;
        }
    }
    //check to see if the name exists
    if(userInList){ 
        feedback.textContent = 'User is already registered!';
        feedback.style.color = 'red';
    }else{ 
        //create new list item
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${name}, Email: ${email}`;
        
        //append to the user list 
        userList.appendChild(listItem);
        
        
        feedback.textContent = 'User registered successfully!';
        feedback.style.color = 'green';

        //dynamically add JSON-LD to the page 
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(userJSONLD);
        document.head.appendChild(script);
    }
    
    // Clear form fields 
    userForm.reset();
});