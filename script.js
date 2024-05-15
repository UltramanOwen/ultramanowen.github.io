document.addEventListener('DOMContentLoaded', () => {
    fetch('posts/posts.json')
        .then(response => response.json())
        .then(posts => {
            const blogPostsContainer = document.getElementById('blog-posts');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.date}</p>
                    <p>${post.content}</p>
                `;
                blogPostsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
});
