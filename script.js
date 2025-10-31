// --- Dropdown Toggle ---
document.querySelectorAll('.dropbtn').forEach(button => {
  button.addEventListener('click', () => {
    const dropdown = button.parentElement;
    dropdown.classList.toggle('open');
  });
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Active Link Highlight ---
const links = document.querySelectorAll('.sidebar a');
links.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// --- Dark Mode ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// --- Mobile Sidebar Toggle ---
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// --- Sidebar Search Filtering ---
const searchBox = document.getElementById('searchBox');
const sidebarLinks = document.querySelectorAll('.sidebar a');

searchBox.addEventListener('input', () => {
  const query = searchBox.value.toLowerCase();

  sidebarLinks.forEach(link => {
    const text = link.textContent.toLowerCase();
    const parentDropdown = link.closest('.dropdown');
    if (text.includes(query)) {
      link.classList.remove('hidden');
      if (parentDropdown) parentDropdown.classList.add('open');
    } else {
      link.classList.add('hidden');
    }
  });

  // Hide dropdowns if none of their children match
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const visibleLinks = dropdown.querySelectorAll('a:not(.hidden)');
    dropdown.style.display = visibleLinks.length ? 'block' : 'none';
  });

  // Show all if search box is empty
  if (query === '') {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.style.display = 'block';
      dropdown.classList.remove('open');
      dropdown.querySelectorAll('a').forEach(link => link.classList.remove('hidden'));
    });
  }
});
