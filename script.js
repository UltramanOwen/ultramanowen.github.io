document.addEventListener('DOMContentLoaded', () => {
    const postsPerPage = 2; // Number of posts per page
    let currentPage = 1;
    let totalPosts = 0;
    let posts = [];

    const blogPostsContainer = document.getElementById('blog-posts');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    fetch('posts/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
            totalPosts = posts.length;
            displayPosts();
            updateButtons();
        })
        .catch(error => console.error('Error fetching posts:', error));

    function displayPosts() {
        blogPostsContainer.innerHTML = '';
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = posts.slice(start, end);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.date}</p>
                <p>${post.content}</p>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    function updateButtons() {
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(totalPosts / postsPerPage);
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPosts();
            updateButtons();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
            currentPage++;
            displayPosts();
            updateButtons();
        }
    });
});
