<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const router = useRouter()

onMounted(async () => {
  try {
    const response = await fetch('/api/posts')
    if (!response.ok) {
      throw new Error('記事の取得に失敗しました')
    }
    posts.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch posts:', err)
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>📝 My Blog</h1>
      <p class="subtitle">Cloudflare D1 + Vue で作成したブログ</p>
    </header>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>記事を読み込み中...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>❌ {{ error }}</p>
    </div>
    
    <div v-else-if="posts.length === 0" class="empty">
      <p>まだ記事がありません</p>
    </div>
    
    <div v-else class="posts">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <h2>
          <router-link :to="`/post/${post.slug}`">
            {{ post.title }}
          </router-link>
        </h2>
        <p class="excerpt">{{ post.excerpt }}</p>
        <time class="date">{{ formatDate(post.created_at) }}</time>
      </article>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  background: #fadbd8;
  border-radius: 8px;
}

.empty {
  text-align: center;
  padding: 3rem;
  color: #95a5a6;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-card {
  border: 1px solid #e1e8ed;
  padding: 2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: white;
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.post-card h2 a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.2s;
}

.post-card h2 a:hover {
  color: #3498db;
}

.excerpt {
  color: #555;
  margin: 1rem 0;
  line-height: 1.6;
}

.date {
  color: #95a5a6;
  font-size: 0.9rem;
}
</style>