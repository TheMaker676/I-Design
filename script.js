document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('blogForm');
  const postsContainer = document.getElementById('blogPosts');
  const LOCAL_STORAGE_POST_KEY = 'task.posts';
  
  function renderPosts() {
      let posts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_POST_KEY)) || [];
      postsContainer.innerHTML = '';
      posts.forEach((post, index) => {
          const postElement = document.createElement('div');
          postElement.innerHTML = `
              <h2>${post.title}</h2>
              <p>${post.name}</p>
              <p class="email-clr">(${post.email})</p>
              <p>${post.content}</p>
              <button class="delete-btn" data-index="${index}">Delete Post</button>
              <hr>
          `;
          postsContainer.appendChild(postElement);
      });
      
      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', function() {
              deletePost(parseInt(button.getAttribute('data-index')));
          });
      });
  }

  function deletePost(index) {
      let posts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_POST_KEY)) || [];
      if (index >= 0 && index < posts.length) {
          posts.splice(index, 1);
          localStorage.setItem(LOCAL_STORAGE_POST_KEY, JSON.stringify(posts));
          renderPosts();
      }
  }

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const title= document.getElementById('title').value;
      const content = document.getElementById('content').value;

      const newPost = { name, email, content, title: "Blog Topic: " + title };
      let posts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_POST_KEY)) || [];
      posts.push(newPost);
      localStorage.setItem(LOCAL_STORAGE_POST_KEY, JSON.stringify(posts));
      form.reset();
      renderPosts();
  });

  renderPosts();
});