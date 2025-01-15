const API_URL = 'http://localhost:3000/api/blogs';

document.getElementById('blogForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const author = document.getElementById('author').value || 'Anonymous';

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, author })
    });

    if (response.ok) {
        alert('Blog created successfully!');
        fetchBlogs();
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
});

async function fetchBlogs() {
    const response = await fetch(API_URL);
    const blogs = await response.json();

    const blogsContainer = document.getElementById('blogs');
    blogsContainer.innerHTML = ''; 

    blogs.forEach((blog) => {
        const blogDiv = document.createElement('div');
        blogDiv.className = 'blog';
        blogDiv.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.body}</p>
            <p><strong>Author:</strong> ${blog.author}</p>
            <p><strong>Created:</strong> ${blog.createdAt}</p>
            <div class="blog-actions">
                <button onclick="deleteBlog('${blog._id}')">Delete</button>
                <button onclick="editBlog('${blog._id}')">Edit</button>
            </div>
        `;
        blogsContainer.appendChild(blogDiv);
    });
}

async function deleteBlog(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (response.ok) {
        alert('Blog deleted successfully!');
        fetchBlogs(); 
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
}

async function editBlog(id) {
    const newTitle = prompt('Enter new title:');
    const newBody = prompt('Enter new body:');
    if (!newTitle || !newBody) return;

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, body: newBody })
    });

    if (response.ok) {
        alert('Blog updated successfully!');
        fetchBlogs();
    } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
    }
}

fetchBlogs();
