const apiUrl = "https://dog.ceo/api/breeds/image/random/";
const imagesPerLoad = 5;

let startIndex = 0;

function createImageElement(imageURL) {
  const imageElement = document.createElement("img");
  imageElement.src = imageURL;
  imageElement.classList.add("image");
  return imageElement;
}

async function fetchDogImages() {
  try {
    const response = await fetch(apiUrl + imagesPerLoad);
    const data = await response.json();
    const images = data.message;

    const container = document.getElementById("image-container");
    for (let i = 0; i < images.length; i++) {
      const imageElement = createImageElement(images[i]);
      container.appendChild(imageElement);
    }

    startIndex += images.length;
  } catch (error) {
    console.log("Error fetching dog images:", error);
  }
}

function isAtBottom() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return scrollTop >= documentHeight - windowHeight;
}

window.addEventListener("scroll", async () => {
  if (isAtBottom()) {
    await fetchDogImages();
  }
});

fetchDogImages();
