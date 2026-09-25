
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        fetch('/api/blog').then(r => r.json()).then(blogs => {
            if(id) {
                const b = blogs.find(x => x.id === id);
                if(b) {
                    document.getElementById('blogContent').innerHTML = `
    ${b.image ? '<img src="' + b.image + '" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 12px; margin-bottom: 30px;">' : ''}
    <h2 style="color:var(--text-primary); margin-bottom: 20px;">${b.title}</h2>
    <div style="color:var(--text-secondary); font-size: 14px; margin-bottom: 20px;">${new Date(b.date).toLocaleDateString()}</div>
    <div style="color:var(--text-primary); line-height: 1.8;" class="blog-html-content">${b.content}</div>
    <a href="/blog" class="btn" style="display:inline-block; margin-top:30px; text-decoration:none;">Geri Dön</a>
                    `;
                }
            } else {
                document.getElementById('blogContent').innerHTML = '<div class="blog-grid">' + blogs.map(b => `
                    <a href="/blog?id=${b.id}" class="blog-card">
                        ${b.image ? '<img src="' + b.image + '" class="blog-cover" alt="Cover">' : ''}
                        <h3>${b.title}</h3>
                        <p>${b.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...</p>
                        <div class="blog-meta">${new Date(b.date).toLocaleDateString()}</div>
                    </a>
                `).join('') + '</div>';
            }
        });
    