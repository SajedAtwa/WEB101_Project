// Assuming these are the same functions as before
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

let themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", toggleDarkMode);

// Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.

// Refactored addSignature function to accept an object
const addSignature = (person) => {
    // Create a new paragraph element on the page where the other signatures are
    const newSignature = document.createElement('p');
    newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

    if (person.name && person.hometown && person.email) {
        const signaturesDiv = document.querySelector('.signatures');
        signaturesDiv.appendChild(newSignature);
    } else {
        alert('Please enter your name, hometown, and email to sign the petition.');
    }
};

// Updated validateForm function with object usage
const validateForm = () => {
  let containsErrors = false;
  let person = { name: '', hometown: '', email: '' };

  // Select the email input for specific validation
  const emailInput = document.getElementById('email');
  person.email = emailInput.value.trim();

  if (!person.email.includes('.com')) {
    console.log('Email validation failed'); // Debug log
    emailInput.classList.add('error');
    containsErrors = true;
  } else {
    emailInput.classList.remove('error');
  }

  // Get all other input elements in the form
  let petitionInputs = document.querySelectorAll("#sign-petition input[type='text']");
  person.name = document.getElementById('name').value.trim();
  person.hometown = document.getElementById('hometown').value.trim();

  if (person.name.length === 0 || person.hometown.length === 0) {
    console.log('Empty input validation failed'); // Debug log
    containsErrors = true;
    petitionInputs.forEach(input => input.classList.add('error'));
  } else {
    petitionInputs.forEach(input => input.classList.remove('error'));
  }

  if (!containsErrors) {
    addSignature(person);
    toggleModal(person); // Call the modal toggle function after a signature is added

    // Clear all inputs
    emailInput.value = '';
    petitionInputs.forEach(input => input.value = '');
  }
};

// Add a 'click' event listener for the sign now button and set validateForm as the callback function
const signNowButton = document.getElementById('sign-now-button');
signNowButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    validateForm(); // Call the function to validate the form and add the signature
});

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

// Outside of any functions, create a new variable to select every element with the class revealable.
let revealableContainers = document.querySelectorAll('.revealable');

// Function to reveal elements on scroll
const reveal = () => {
  let windowHeight = window.innerHeight;

  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
};

// Add reveal as an event listener to window, with the type of event as 'scroll'
window.addEventListener('scroll', reveal);

let reducedMotionEnabled = false;

// This function toggles the motion reduction state and updates styles accordingly
const reduceMotion = () => {
  // Toggle the reduced motion state
  reducedMotionEnabled = !reducedMotionEnabled;

  // Update the animation object based on the reduced motion state
  animation.transitionDuration = reducedMotionEnabled ? '0s' : '2s';
  animation.revealDistance = reducedMotionEnabled ? 0 : 150;

  // Update the styles of revealable elements
  revealableContainers.forEach(container => {
    container.style.transitionDuration = animation.transitionDuration;
    // Only change the transform if the container is already active to avoid it snapping into place immediately
    if (container.classList.contains('active')) {
      container.style.transform = reducedMotionEnabled ? 'none' : 'translateY(150px)';
    }
  });
};

// Select the button and add the event listener
const reduceMotionButton = document.getElementById('reduce-motion-button');
reduceMotionButton.addEventListener('click', reduceMotion);


// Function to toggle the modal on and off
const toggleModal = (person) => {
  // Select the modal and the modal content elements from the document
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('modal-text-container');

  // Set the text content of the modal to a nice thank you message using the person's name
  modalContent.textContent = `Knock knock. Who's there? Not ${person.name} because you're out there representing ${person.hometown} like a champ! Thanks for your support!`;

  // Set the display style property of the entire modal to flex to make it visible
  modal.style.display = 'flex';

  // Use setTimeout to hide the modal after 4 seconds
  setTimeout(() => {
    modal.style.display = 'none'; // This will hide the modal
  }, 6000); // 6000 milliseconds = 6 seconds
};
