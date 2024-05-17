document.addEventListener('DOMContentLoaded', () => {
    const postsPerPage = 5; // Number of posts per page
    let currentPage = 1;
    let totalPosts = 0;
    let posts = [];

    const blogPostsContainer = document.getElementById('blog-posts');
    const firstPageButton = document.getElementById('first-page');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    fetch('posts/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
            totalPosts = posts.length;
            displayPosts();
            updateButtons();
            updatePageInfo();
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
        firstPageButton.disabled = currentPage === 1;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(totalPosts / postsPerPage);
    }

    function updatePageInfo() {
        pageInfo.textContent = `${currentPage} of ${Math.ceil(totalPosts / postsPerPage)}`;
    }

    firstPageButton.addEventListener('click', () => {
        currentPage = 1;
        displayPosts();
        updateButtons();
        updatePageInfo();
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPosts();
            updateButtons();
            updatePageInfo();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
            currentPage++;
            displayPosts();
            updateButtons();
            updatePageInfo();
        }
    });
});
