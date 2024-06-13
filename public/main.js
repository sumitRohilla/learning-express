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
  container.innerHTML = "";
  let ele = document.createElement("div");

  try {
    const response = await fetch("/api/posts", signal);

    if (!response.ok) {
      throw new Error("Error fetching Posts!!");
    }
    const posts = await response.json();

    posts.map((post) => {
      ele = document.createElement("div");
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(`Error occured : ${e.message}`);
      ele.textContent = e.message;
      container.appendChild(ele);
    }
  }
};

//GET single Post
const fetchPost = async (id) => {
  container.innerHTML = "";
  const ele = document.createElement("div");

  try {
    const response = await fetch(`/api/posts/${id}`, signal);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }
    const post = await response.json();

    ele.textContent = post.title;
    container.appendChild(ele);
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(e.message);
      ele.textContent = e;
      container.appendChild(ele);
    }
  }
};

//POST data

const addPost = async (title) => {
  container.innerHTML = "";
  const ele = document.createElement("div");

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
      const err = await response.json();
      throw new Error(err.message);
    }
    const posts = await response.json();

    posts.map((post) => {
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(e.message);
      ele.textContent = e;
      container.appendChild(ele);
    }
  }
};

//Update data

const updatePost = async (id, title) => {
  container.innerHTML = "";
  const ele = document.createElement("div");

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
      const err = await response.json();
      throw new Error(err.message);
    }
    const posts = await response.json();

    posts.map((post) => {
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(e.message);
      ele.textContent = e;
      container.appendChild(ele);
    }
  }
};

//delete data

const deletePost = async (id) => {
  container.innerHTML = "";
  const ele = document.createElement("div");

  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      signal: signal,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }
    const posts = await response.json();

    posts.map((post) => {
      ele.textContent = post.title;
      container.appendChild(ele);
    });
  } catch (e) {
    if (e.name == "AbortError") {
      console.log("Aborted fetching data!!");
    } else {
      console.log(e.message);
      ele.textContent = e;
      container.appendChild(ele);
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
