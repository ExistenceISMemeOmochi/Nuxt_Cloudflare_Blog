<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch(`/api/posts/${route.params.slug}`)
    if (!response.ok) {
      throw new Error('記事が見つかりませんでした')
    }
    post.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch post:', err)
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

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>記事を読み込み中...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>❌ {{ error }}</p>
      <button @click="goBack" class="back-button">← 一覧に戻る</button>
    </div>
    
    <article v-else-if="post" class="post">
      <header class="post-header">
        <h1>{{ post.title }}</h1>
        <time class="date">{{ formatDate(post.created_at) }}</time>
      </header>
      
      <div class="content" v-html="post.content"></div>
      
      <footer class="post-footer">
        <button @click="goBack" class="back-button">← 一覧に戻る</button>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
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

.post {
  background: white;
  border-radius: 12px;
  padding: 2rem;
}

.post-header {
  border-bottom: 2px solid #e1e8ed;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.post-header h1 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
  font-size: 2rem;
}

.date {
  color: #95a5a6;
  font-size: 0.9rem;
}

.content {
  line-height: 1.8;
  color: #333;
  font-size: 1.1rem;
}

.content :deep(p) {
  margin-bottom: 1rem;
}

.content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e8ed;
}

.back-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.back-button:hover {
  background: #2980b9;
}
</style>