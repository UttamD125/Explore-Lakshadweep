const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get('success');
const city = urlParams.get('city');
const operation = urlParams.get('operation');
const type = urlParams.get('type');


if (success === 'true' && city) {
    let message = '';

    if (type === 'fromcruise') {
        message = `${city} added to From Cruise successfully!`;
    } else if (type === 'tocruse') {
        message = `${city} added to To Cruise successfully!`;
    } else if (type === 'toflight') {
        message = `${city} added to To Flight successfully!`;
    } else if (type === 'fromflight') {
        message = `${city} added in From Flight successfully!`;
    }

    
    if (message) {
        alert(message);
    }
}


if (success === 'true' && operation === 'delete' && city) {
    const deleteMessage = `${city} deleted successfully!`;
    alert(deleteMessage);
}
  

document.addEventListener("DOMContentLoaded", function () {
    
    const approveButtons = document.querySelectorAll(".approve-package-btn");
    approveButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const bookingId = button.getAttribute("data-id");

            fetch("/approvePackageBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId: bookingId }),
            })
                .then((response) => {
                    if (response.ok) {
                        location.reload(); 
                    } else {
                        console.error("Failed to approve the booking.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        });
    });

    
    const rejectButtons = document.querySelectorAll(".reject-package-btn");
    rejectButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const bookingId = button.getAttribute("data-id");

            fetch("/rejectPackageBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId: bookingId }),
            })
                .then((response) => {
                    if (response.ok) {
                        location.reload(); 
                    } else {
                        console.error("Failed to reject the booking.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        });
    });

    
    const deleteButtons = document.querySelectorAll(".delete-package-btn");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            
            const bookingId = button.getAttribute("data-id");

            
            if (confirm("Are you sure you want to delete this package booking?")) {
                
                fetch(`/deletePackageBooking/${bookingId}`, {
                    method: "POST",
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error("Failed to delete package booking.");
                        }
                    })
                    .then((data) => {
                        alert("Package booking deleted successfully.");
                        location.reload(); 
                    })
                    .catch((error) => {
                        console.error("Error:", error.message);
                        alert("Error deleting package booking.");
                    });
            }
        });
    });
});

  

document.addEventListener("DOMContentLoaded", function () {
    
    const approveButtons = document.querySelectorAll(".approve-flight-btn");
    approveButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const bookingId = button.getAttribute("data-id");

            fetch("/approveFlightBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId: bookingId }),
            })
                .then((response) => {
                    if (response.ok) {
                        location.reload(); 
                    } else {
                        console.error("Failed to approve the booking.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        });
    });

    
    const rejectButtons = document.querySelectorAll(".reject-flight-btn");
    rejectButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const bookingId = button.getAttribute("data-id");

            fetch("/rejectFlightBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId: bookingId }),
            })
                .then((response) => {
                    if (response.ok) {
                        location.reload(); 
                    } else {
                        console.error("Failed to reject the booking.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        });
    });
});



  
document.addEventListener("DOMContentLoaded", function () {
    
    const approveButtons = document.querySelectorAll(".approve-cruise-btn");
    approveButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const bookingId = button.getAttribute("data-id");

            fetch("/approveCruiseBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId: bookingId }),
            })
                .then((response) => {
                    if (response.ok) {
                        location.reload(); 
                    } else {
                        console.error("Failed to approve the booking.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        });
    });

    
    const rejectButtons = document.querySelectorAll(".reject-cruise-btn");
    rejectButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const bookingId = button.getAttribute("data-id");

            fetch("/rejectCruiseBooking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bookingId: bookingId }),
            })
                .then((response) => {
                    if (response.ok) {
                        location.reload(); 
                    } else {
                        console.error("Failed to reject the booking.");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-flight-btn");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            
            const bookingId = button.getAttribute("data-id");

            
            if (confirm("Are you sure you want to delete this flight booking?")) {
                
                fetch(`/deleteFlightBooking/${bookingId}`, {
                    method: "POST",
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error("Failed to delete flight booking.");
                        }
                    })
                    .then((data) => {
                        alert("Flight booking deleted successfully.");
                        location.reload(); 
                    })
                    .catch((error) => {
                        console.error("Error:", error.message);
                        alert("Error deleting flight booking.");
                    });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const deleteCruiseButtons = document.querySelectorAll(".delete-cruise-btn");

    deleteCruiseButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            
            const bookingId = button.getAttribute("data-id");

            
            if (confirm("Are you sure you want to delete this cruise booking?")) {
                
                fetch(`/deleteCruiseBooking/${bookingId}`, {
                    method: "POST",
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error("Failed to delete cruise booking.");
                        }
                    })
                    .then((data) => {
                        alert("Cruise booking deleted successfully.");
                        location.reload(); 
                    })
                    .catch((error) => {
                        console.error("Error:", error.message);
                        alert("Error deleting cruise booking.");
                    });
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('addPackageForm');
    const daysInput = document.getElementById('days');
    const nightsInput = document.getElementById('nights');
    const addLocationButton = document.getElementById('addLocationButton');
    const locationsContainer = document.getElementById('locationsContainer');
    const addInclusionButton = document.getElementById('addInclusionButton');
    const inclusionsContainer = document.getElementById('inclusionsContainer');
    const itineraryContainer = document.getElementById('itineraryContainer');

    
    daysInput.addEventListener('input', () => {
        const days = parseInt(daysInput.value) || 0;
        nightsInput.value = days > 0 ? days - 1 : 0;

        
        itineraryContainer.innerHTML = ''; 
        for (let i = 1; i <= days; i++) {
            const itineraryInput = document.createElement('input');
            itineraryInput.type = 'text';
            itineraryInput.name = `itineraryDay${i}`;
            itineraryInput.placeholder = `Day ${i} Itinerary`;
            itineraryContainer.appendChild(itineraryInput);
        }
    });

    
    addLocationButton.addEventListener('click', () => {
        const locationCount = locationsContainer.querySelectorAll('input[name="location"]').length;
        if (locationCount < 4) {
            const locationInput = document.createElement('input');
            locationInput.type = 'text';
            locationInput.name = 'location'; 
            locationInput.placeholder = `Location ${locationCount + 1}`;
            locationsContainer.insertBefore(locationInput, addLocationButton);
        } else {
            alert('You can only add up to 4 locations.');
        }
    });

    
    addInclusionButton.addEventListener('click', () => {
        const inclusionCount = inclusionsContainer.querySelectorAll('input[name="inclusion"]').length;
        if (inclusionCount < 6) {
            const inclusionInput = document.createElement('input');
            inclusionInput.type = 'text';
            inclusionInput.name = 'inclusion'; 
            inclusionInput.placeholder = `Inclusion ${inclusionCount + 1}`;
            inclusionsContainer.insertBefore(inclusionInput, addInclusionButton);
        } else {
            alert('You can only add up to 6 inclusions.');
        }
    });

    
    form.addEventListener('submit', function(event) {
        
        const locations = Array.from(locationsContainer.querySelectorAll('input[name="location"]'))
            .map(input => input.value);
        
        
        const inclusions = Array.from(inclusionsContainer.querySelectorAll('input[name="inclusion"]'))
            .map(input => input.value);
        
        
        const itinerary = Array.from(itineraryContainer.querySelectorAll('input[name^="itineraryDay"]'))
            .map(input => input.value);

        
        const locationsInput = document.createElement('input');
        locationsInput.type = 'hidden';
        locationsInput.name = 'locations'; 
        locationsInput.value = JSON.stringify(locations);
        form.appendChild(locationsInput);

        const inclusionsInput = document.createElement('input');
        inclusionsInput.type = 'hidden';
        inclusionsInput.name = 'inclusions'; 
        inclusionsInput.value = JSON.stringify(inclusions);
        form.appendChild(inclusionsInput);

        const itineraryInput = document.createElement('input');
        itineraryInput.type = 'hidden';
        itineraryInput.name = 'itinerary'; 
        itineraryInput.value = JSON.stringify(itinerary);
        form.appendChild(itineraryInput);
    });
});


