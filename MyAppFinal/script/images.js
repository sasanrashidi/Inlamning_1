'use strict';

// List of image URLs
const imageUrls = [
    "./img/image1.jpg",
    "./img/image2.jpg",
    "./img/image3.jpg",
    "./img/image4.jpg",
    "./img/image5.jpg",
    "./img/image6.jpg"
];

// Get Elements
const imageList = document.querySelector("#imageList");
const btnAddImage = document.querySelector("#btnAddImage");
const btnClearImages = document.querySelector("#btnClearImages");

// Add event listeners
btnAddImage.addEventListener("click", clickAddImage);
btnClearImages.addEventListener("click", clickClearImages);

// Declare event handlers // DESSA KNAPPAR ANVÄNDS EJ
function clickAddImage(e) {
    // Get a random image URL from the list
    const randomImageUrl = getRandomImageUrl();
    // Add the random image
    addImage(randomImageUrl, "Random Description");
}

function clickClearImages(e) {
    clearImages();
}

// Helper function to get a random image URL from the list
function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}

// Helper function to add an image
function addImage(src, alt) {
    let divImageContainer = document.createElement("div");
    divImageContainer.classList.add("image-container");

    let img = document.createElement("img");
    img.src = src;
    img.alt = alt;

    let p = document.createElement("p");
    p.textContent = alt;

    divImageContainer.appendChild(img);
    divImageContainer.appendChild(p);

    imageList.appendChild(divImageContainer);
}

function clearImages() {
    imageList.innerHTML = ""; // Remove all images
}

// Initialize the page
(function pageInit() {
    // You can add initial images here if needed
})();
