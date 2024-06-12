const getButton = document.getElementById("get-posts-btn");
const getSingleButton = document.getElementById("get-postById-btn");
const postButton = document.getElementById("post-button");
const updateButton = document.getElementById("update-button");
const deleteButton = document.getElementById("delete-button");
const container = document.getElementById("output");
const inputID = document.getElementById("id-input");
const titleInput = document.getElementById("title-input");

// API posts
const controller = new AbortController();
const signal = controller.signal;

// GET all Post
const fetchPosts = async () => {
  try {
    const response = await fetch("/api/posts", signal);

    console.log("all get");

    if (!response.ok) {
      throw new Error("Error fetching Posts!!");
    }
    const posts = await response.json();

    container.innerHTML = "";

    posts.map((post) => {
      const ele = document.createElement("div");
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(`Error occured : ${e.message}`);
    }
  }
};

//GET single Post
const fetchPost = async (id) => {
  try {
    const response = await fetch(`/api/posts/${id}`, signal);

    console.log("single get");

    if (!response.ok) {
      throw new Error("Error fetching Posts!!");
    }
    const post = await response.json();

    container.innerHTML = "";

    const ele = document.createElement("div");
    ele.textContent = post.title;
    container.appendChild(ele);
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(`Error occured : ${e.message}`);
    }
  }
};

//POST data

const addPost = async (title) => {
  try {
    console.log(JSON.stringify({ title }));
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
      signal: signal,
    });

    if (!response.ok) {
      throw new Error("Error fetching Posts!!");
    }
    const posts = await response.json();

    container.innerHTML = "";

    posts.map((post) => {
      const ele = document.createElement("div");
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(`Error occured : ${e.message}`);
    }
  }
};

//Update data

const updatePost = async (id, title) => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
      signal: signal,
    });

    if (!response.ok) {
      throw new Error("Error fetching Posts!!");
    }
    const posts = await response.json();

    container.innerHTML = "";

    posts.map((post) => {
      const ele = document.createElement("div");
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(`Error occured : ${e.message}`);
    }
  }
};

//delete data

const deletePost = async (id) => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      signal: signal,
    });

    if (!response.ok) {
      throw new Error("Error fetching Posts!!");
    }
    const posts = await response.json();

    container.innerHTML = "";

    posts.map((post) => {
      const ele = document.createElement("div");
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(`Error occured : ${e.message}`);
    }
  }
};

// event Listeners

getButton.addEventListener("click", () => fetchPosts());
getSingleButton.addEventListener("click", () =>
  fetchPost(parseInt(inputID.value))
);
postButton.addEventListener("click", () => addPost(titleInput.value));
updateButton.addEventListener("click", () =>
  updatePost(parseInt(inputID.value), titleInput.value)
);
deleteButton.addEventListener("click", () =>
  deletePost(parseInt(inputID.value))
);
