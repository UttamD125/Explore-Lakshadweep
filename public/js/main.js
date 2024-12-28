function toggle2( event ){
    event.preventDefault();
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    var popup3 = document.getElementById('popup3');
    popup3.classList.toggle('active')
}
function toggle3(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    var popup4 = document.getElementById('popup4');
    popup4.classList.toggle('active')
}
function toggle4(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    var popup5 = document.getElementById('popup5');
    popup5.classList.toggle('active')
}
function toggle5(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    var popup6 = document.getElementById('popup6');
    popup6.classList.toggle('active')
}
function toggle6(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    var popup7 = document.getElementById('popup7');
    popup7.classList.toggle('active')
}

function showAlert(message) {
    if (message) {
        alert(message);
    }
}

window.addEventListener('scroll',reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for( var i = 0 ; i < reveals.length; i++ ){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 170;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('reveal1_active');
        }else{
            reveals[i].classList.remove('reveal1_active');
        }
    }
}

window.addEventListener('scroll',reveal_slow);
function reveal_slow(){
    var revealss = document.querySelectorAll('.reveal_slow');

    for( var i = 0 ; i < revealss.length; i++ ){
        var windowheights = window.innerHeight;
        var revealtops = revealss[i].getBoundingClientRect().top;
        var revealpoints = 11;

        if(revealtops < windowheights - revealpoints){
            revealss[i].classList.add('reveal_slow_active');
        }else{
            revealss[i].classList.remove('reveal_slow_active');
        }
    }
}

window.addEventListener('scroll',reveal_left);
function reveal_left(){
    var reveals1 = document.querySelectorAll('.reveal_left');

    for( var i = 0 ; i < reveals1.length; i++ ){
        var windowheight1 = window.innerHeight;
        var revealtop1 = reveals1[i].getBoundingClientRect().top;
        var revealpoint1 = 110;

        if(revealtop1 < windowheight1 - revealpoint1){
            reveals1[i].classList.add('reveal2_active');
        }else{
            reveals1[i].classList.remove('reveal2_active');
        }
    }
}

window.addEventListener('scroll',reveal_right);
function reveal_right(){
    var reveals2 = document.querySelectorAll('.reveal_right');

    for( var i = 0 ; i < reveals2.length; i++ ){
        var windowheight2 = window.innerHeight;
        var revealtop2 = reveals2[i].getBoundingClientRect().top;
        var revealpoint2 = 170;

        if(revealtop2 < windowheight2 - revealpoint2){
            reveals2[i].classList.add('reveal3_active');
        }else{
            reveals2[i].classList.remove('reveal3_active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close_btn');
    const contactUs_id = document.getElementById('contact_popup_id');
    const contactUs = document.getElementById('contactUs');
    const cancel_icon1 = document.querySelector('.cancel_icon1');
    const Newsletter = document.getElementById('Newsletter');
    const newsletter_id = document.getElementById('newsletter_popup_id');
    const cancel_icon = document.querySelector('.cancel_icon');
    const blur = document.getElementById('blur');
    const profile_id = document.getElementById('profile_id');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const register_switch = document.getElementById('register_switch');
    const login_switch = document.getElementById('login_switch');
    const login_cancel = document.getElementById('login_cancel');
    const register_cancel = document.getElementById('register_cancel');
      
    profile_id.addEventListener('click', (event) => {
        event.preventDefault();
        
        function getCookie(name) {
            let cookieArr = document.cookie.split("; ");
            for (let i = 0; i < cookieArr.length; i++) {
                let cookie = cookieArr[i];
                if (cookie.startsWith(name + "=")) {
                    return cookie.substring(name.length + 1);  
                }
            }
            return null;  
        }
        
        function isLoggedIn() {
            const token = getCookie("userName"); 
            console.log('Auth token:', token);  
            return token !== null;
        }
        
        if (isLoggedIn()) {
            window.location.href = '/cruisestatus';  
        } else {
            loginForm.style.display = 'flex';
            blur.style.filter = 'blur(4px)';
        }
    });
    

    login_cancel.addEventListener('click', (event)=>{
        event.preventDefault();
        loginForm.style.display = 'none';
        blur.style.filter = 'none';
    });
    register_cancel.addEventListener('click', (event)=>{
        event.preventDefault();
        registerForm.style.display = 'none';
        blur.style.filter = 'none';
    });
    

    register_switch.addEventListener('click' , (event)=> {
        event.preventDefault();
        registerForm.style.display = 'flex';
        loginForm.style.display = 'none';
        blur.style.filter = 'blur(4px)';
    });

    login_switch.addEventListener('click' , (event)=> {
        event.preventDefault();
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        blur.style.display = 'blur(4px)';
    });

    Newsletter.addEventListener('click',(event) => {
        event.preventDefault();
        newsletter_id.style.display = 'flex';
        blur.style.filter = 'blur(4px)';
    });
    cancel_icon.addEventListener('click',() => {
        newsletter_id.style.display = 'none';
        blur.style.filter = 'none';
    });

    contactUs.addEventListener('click',(event) => {
        event.preventDefault();
        contactUs_id.style.display = 'flex';
        blur.style.filter = 'blur(4px)';
    });
    cancel_icon1.addEventListener('click',() => {
        contactUs_id.style.display = 'none';
        blur.style.filter = 'none';
    });

    profileBtn.addEventListener('click', () => {
        login_modal.style.display = 'block';
        blur.style.filter = 'blur(4px)';
    });

    closeBtn.addEventListener('click', () => {
        login_modal.style.display = 'none';
        blur.style.filter = 'none';
    });
});

(function() {
    
    function getCookie(name) {
        let cookieArr = document.cookie.split("; ");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookie = cookieArr[i];
            if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1); 
            }
        }
        return null;  
    }

    
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        
        const userName = getCookie("userName");

        
        if (userName) {
            greetingElement.textContent = `Hi, ${userName}!`;  
        }
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.reveal');
    
    forms.forEach((form) => {
        const blur = document.getElementById('blur');
        const departureDateInput = form.querySelector('#departure');
        const returnDateInput = form.querySelector('#return');
        const oneWayTrip = form.querySelector('#one-wayTrip');
        const roundTrip = form.querySelector('#roundTrip');
        const fromInput = form.querySelector('#fromInput');
        const toInput = form.querySelector('#toInput');
        const today = new Date().toISOString().split('T')[0]; 

        
        if (departureDateInput) {
            departureDateInput.setAttribute('min', today);

            departureDateInput.addEventListener('change', () => {
                if (roundTrip && roundTrip.checked && returnDateInput) {
                    returnDateInput.setAttribute('min', departureDateInput.value); 
                }
            });
        }

        
        if (oneWayTrip && roundTrip && returnDateInput) {
            oneWayTrip.addEventListener('change', () => {
                returnDateInput.disabled = true;
                returnDateInput.value = ''; 
            });

            roundTrip.addEventListener('change', () => {
                returnDateInput.disabled = false;
                returnDateInput.setAttribute('min', departureDateInput.value || today); 
            });

            
            if (oneWayTrip.checked) {
                returnDateInput.disabled = true;
            }
        }

        
        if (fromInput && toInput) {
            function updateCityOptions() {
                const fromCity = fromInput.value;
                const toCity = toInput.value;

                
                Array.from(toInput.options).forEach(option => (option.disabled = false));
                Array.from(fromInput.options).forEach(option => (option.disabled = false));

                
                Array.from(toInput.options).forEach(option => {
                    if (option.value === fromCity) option.disabled = true;
                });
                Array.from(fromInput.options).forEach(option => {
                    if (option.value === toCity) option.disabled = true;
                });
            }

            fromInput.addEventListener('change', updateCityOptions);
            toInput.addEventListener('change', updateCityOptions);

            
            updateCityOptions();
        }

        
        form.addEventListener('submit', function (event) {
            if (!isLoggedIn()) {
                event.preventDefault();
                alert("You need to login to book a trip.");
                
                loginForm.style.display = 'flex';
                blur.style.filter = 'blur(4px)';
            } else {
                console.log("Form submitted");
            }
        });
    });

    
    function getCookie(name) {
        const cookieArr = document.cookie.split('; ');
        for (let cookie of cookieArr) {
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    function isLoggedIn() {
        const token = getCookie("userName"); 
        console.log('Auth token:', token); 
        return token !== null;
    }
});
