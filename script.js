const resultsContainer = document.getElementById('results-container');
let page = 1;

async function fetchPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=100`);
  const data = await response.json();
  return data;
}

async function displayPosts() {
  const posts = await fetchPosts();
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  // Hide loader after fetching data
  loader.style.display = 'none';
  if (posts.length === 0) {
    resultsContainer.insertAdjacentHTML('beforeend', '<p>No more posts to load.</p>');
    return;
  }
  

  posts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.className = 'card';
    postCard.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;
    resultsContainer.appendChild(postCard);
  });

  page++;
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    displayPosts();
  }
}

// Initial load
displayPosts();

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

