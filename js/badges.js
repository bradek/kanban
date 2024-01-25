window.onload = function() {
// Get the badges-section div
var badgesSection = document.getElementById('badges-section');

// Check if badge500 is set to true in localStorage
if (localStorage.getItem('badge500') === 'true') {
    // Create an image element
    var img = document.createElement('img');
    // Set the image source
    img.src = '../img/badge_500points.png';
    // Append the image to the badges-section div
    badgesSection.appendChild(img);
}

// Check if badgeFin20 is set to true in localStorage
if (localStorage.getItem('badgeFin20') === 'true') {
    var img = document.createElement('img');
    img.src = '../img/badge_finished20.png';
    badgesSection.appendChild(img);
}

// Check if badgeFree is set to true in localStorage
if (localStorage.getItem('badgeFree') === 'true') {
    var img = document.createElement('img');
    img.src = '../img/badge_freeloader.png';
    badgesSection.appendChild(img);
}
}