document.getElementById('post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadPosts();
            document.getElementById('post-form').reset();
        }
    })
    .catch(error => console.error('Error:', error));
});

function loadPosts() {
    fetch('/posts')
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        data.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error:', error));
}

loadPosts();
