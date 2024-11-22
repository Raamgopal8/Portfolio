let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelector('header nav a');
const form = document.getElementById('myForm');

form.onsubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    alert('Form submitted successfully!'); // Show alert message
    // You can add additional logic here to handle the form data if needed
  };

window.onscroll = () =>{
    selections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ' ]').classList.add ('active')       
             })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}