const addBook = document.getElementById("addBook");
const showBox = document.getElementById("book");

const detail = document.getElementById("bookDetails");
const detailTitle = document.getElementById("detailTitle");
const detailAuthor = document.getElementById("detailAuthor");
const detailImage = document.getElementById("detailImage");
const detailPrice = document.getElementById("detailPrice");
const detailGenre = document.getElementById("detailGenre");
const detailRating = document.getElementById("detailRating");
const detailDesc = document.getElementById("detailDesc");

// --------- Show ---------

const show = () => {
  fetch("http://localhost:5000/books", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      data.map((el) => {
        const div1 = document.createElement("div");
        div1.className = "div1";

        const image = document.createElement("img");
        image.src = el.image;
        const description = document.createElement("p");
        description.innerText = el.description;
        const name = document.createElement("h2");
        const author = document.createElement("h4");
        const genre = document.createElement("h5");
        const rating = document.createElement("h5");
        const price = document.createElement("h5");
        name.innerText = el.name;
        author.innerText = el.author;
        genre.innerText = `Genre : ${el.genre}`;
        rating.innerText = `Rating : ${el.rating}`;
        price.innerText = `Price : ${el.price} $`;
        const btn1 = document.createElement("button");
        const btn2 = document.createElement("button");
        const btn3 = document.createElement("button");
        btn1.innerText = "Edit";
        btn1.className = "btn btn-primary btn-sm my-1 mx-1";
        btn2.innerText = "Delete";
        btn2.className = "btn btn-primary btn-sm my-1 mx-1";
        btn3.innerText = "Read";
        btn3.className = "btn btn-primary btn-sm my-1 mx-1";

        // --------- Edit ---------

        btn1.addEventListener("click", () => {
          alert(`Want to edit ${el.name} ?`);
          const updatedName = prompt("Enter new name");
          const updatedAuthor = prompt("Enter new author");
          const updatedGenre = prompt("Enter new genre");
          const updatedRating = prompt("Enter new rating");
          const updatedPrice = prompt("Enter new price");
          const updatedDesc = prompt("Enter new description");
          const updatedImage = prompt("Enter new image");
          fetch(`http://localhost:5000/books/${el.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: updatedName,
              author: updatedAuthor,
              genre: updatedGenre,
              price: updatedPrice,
              rating: updatedRating,
              description: updatedDesc,
              image: updatedImage,
            }),
          })
            .then((res) => {
              alert("Updated name Successfully");
            })
            .catch((err) => {
              alert("Error occured while updating" + err);
            });
        });

        // -------- Delete --------

        btn2.addEventListener("click", () => {
          alert(`Want to delete ${el.name} ?`);
          fetch(`http://localhost:5000/books/${el.id}`, {
            method: "DELETE",
          })
            .then((res) => {
              alert("Deleted the item");
            })
            .catch((err) => {
              alert("Error occured while deleting");
            });
        });

        btn3.addEventListener("click", () => {
          localStorage.setItem("id", JSON.stringify(el.id));
          window.location.href = "./user.html";
        });

        div1.append(
          image,
          name,
          author,
          genre,
          rating,
          price,
          description,
          btn1,
          btn2,
          btn3
        );
        showBox.append(div1);
      });
    });
};
show();

// -------- Details Page --------

const item = JSON.parse(localStorage.getItem("id"));
const details = async () => {
  await fetch(`http://localhost:5000/books/${item}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((el) => {
      detailTitle.innerText = el.name;
      detailAuthor.innerText = `Author : ${el.author}`;
      detailGenre.innerText = `Genre : ${el.genre}`;
      detailRating.innerText = `Rating : ${el.rating}`;
      detailPrice.innerText = `Price : ${el.price}`;
      detailDesc.innerText = el.fullDesc;
      detailImage.src = el.image;
    });
};
details()

// --------- Add ---------

addBook.addEventListener("click", () => {
  const addName = document.createElement("h2");
  const addImage = document.createElement("img");
  const addDesc = document.createElement("p");
  const addAuthor = document.createElement("h4");
  const addGenre = document.createElement("h5");
  const addRating = document.createElement("h5");
  const addPrice = document.createElement("h5");
  addName.innerText = prompt("Enter Name");
  addImage.src = prompt("Enter Image");
  addDesc.innerText = prompt("Enter Description");
  addAuthor.innerText = prompt("Enter Author");
  addGenre.innerText = prompt("Enter Genre");
  addRating.innerText = prompt("Enter Rating");
  addPrice.innerText = prompt("Enter Price");
  fetch("http://localhost:5000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: addName.innerText,
      image: addImage.src,
      description: addDesc.innerText,
      author: addAuthor.innerText,
      genre: addGenre.innerText,
      rating: addRating.innerText,
      price: addPrice.innerText,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log(res);
      alert("book added successfully");
    } else {
      alert("Error");
    }
  });
  show();
});

function logout_btn() {
  alert("Logout Successful");
  localStorage.removeItem("token");
  window.location.href = "./home.html";
}
