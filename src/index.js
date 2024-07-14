let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");
  const toyCollection = document.getElementById("toy-collection");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch toys and display them
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach((toy) => {
        renderToy(toy);
      });
    });

  // Add new toy
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: "Jessie",
        image:
          "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        likes: 0,
      }),
    })
      .then((response) => response.json())
      .then((newToy) => {
        renderToy(newToy);
        toyForm.reset();
      });
  });

  // Update toy likes
  toyCollection.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-btn")) {
      const toyId = event.target.id;
      const likesElement = event.target.previousElementSibling;
      const newLikes = parseInt(likesElement.innerText) + 1;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: newNumberOfLikes,
        }),
      })
        .then((response) => response.json())
        .then((updatedToy) => {
          likesElement.innerText = `${updatedToy.likes} Likes`;
        });
    }
  });

  // Function to render a toy card
  function renderToy(toy) {
    const toyDiv = document.createElement("div");
    toyDiv.classList.add("card");

    const toyName = document.createElement("h2");
    toyName.innerText = toy.name;

    const toyImage = document.createElement("img");
    toyImage.src = toy.image;
    toyImage.classList.add("toy-avatar");

    const toyLikes = document.createElement("p");
    toyLikes.innerText = `${toy.likes} Likes`;

    const likeButton = document.createElement("button");
    likeButton.innerText = "Like ❤️";
    likeButton.classList.add("like-btn");
    likeButton.id = toy.id;

    toyDiv.append(toyName, toyImage, toyLikes, likeButton);
    toyCollection.appendChild(toyDiv);
  }
});
