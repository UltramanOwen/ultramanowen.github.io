document.addEventListener('DOMContentLoaded', () => {
    const postsPerPage = 5;
    let currentPage = 1;
    let totalPosts = 0;
    let posts = [];

    const blogPostsContainer = document.getElementById('blog-posts');
    const firstPageButton = document.getElementById('first-page');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const blogSection = document.getElementById('blog');

    fetch('posts/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
            totalPosts = posts.length;
            updatePagination();
        })
        .catch(error => console.error('Error fetching posts:', error));

    function displayPosts() {
        blogPostsContainer.innerHTML = '';
        const start = (currentPage - 1) * postsPerPage;
        const end = Math.min(start + postsPerPage, totalPosts);
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

    function updatePagination() {
        displayPosts();
        updateButtons();
        updatePageInfo();
    }

    function scrollToBlogSection() {
        blogSection.scrollIntoView({ behavior: 'smooth' });
    }

    firstPageButton.addEventListener('click', () => {
        if (currentPage !== 1) {
            currentPage = 1;
            updatePagination();
            scrollToBlogSection();
        }
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            scrollToBlogSection();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
            currentPage++;
            updatePagination();
            scrollToBlogSection();
        }
    });
});
