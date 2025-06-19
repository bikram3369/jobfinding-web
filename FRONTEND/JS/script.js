let navbar = document.querySelector('.header .flex .navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    navbar.classList.remove('active');
};

document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
    inputNumber.oninput = () => {
        if (inputNumber.value.length > inputNumber.maxLength)
            inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
    };
});

// for jobfilter dropdown 
// Dropdowns (job type, salary, etc.)
document.querySelectorAll('.dropdown').forEach(drop => {
    const input = drop.querySelector('.output');
    const list = drop.querySelector('.lists');

    input.addEventListener('click', () => {
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
        drop.classList.toggle('active');
    });

    drop.querySelectorAll('.items').forEach(item => {
        item.addEventListener('click', () => {
            input.value = item.textContent;
            drop.classList.remove('active');
        });
    });
});

document.addEventListener('click', e => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }
});

// Autocomplete for job location
const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
    "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore"
];

const locationInput = document.getElementById("job-location");
const suggestionBox = document.getElementById("location-suggestions");

locationInput.addEventListener("input", () => {
    const query = locationInput.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (query === "") {
        suggestionBox.style.display = "none";
        return;
    }

    const matches = cities.filter(city => city.toLowerCase().startsWith(query));

    if (matches.length === 0) {
        suggestionBox.style.display = "none";
        return;
    }

    matches.forEach(city => {
        const item = document.createElement("div");
        item.classList.add("suggestion-item");
        item.textContent = city;
        item.addEventListener("click", () => {
            locationInput.value = city;
            suggestionBox.innerHTML = "";
            suggestionBox.style.display = "none";
        });
        suggestionBox.appendChild(item);
    });

    suggestionBox.style.display = "block";
});

// Hide suggestion box when clicking outside
document.addEventListener("click", e => {
    if (!e.target.closest('.box')) {
        suggestionBox.style.display = "none";
    }
});