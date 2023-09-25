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
        })})
    }