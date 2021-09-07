<template>
  <main class="main">
    <h1 class="title">{{ title }}</h1>
    <p class="publishedAt">{{ publishedAt }}</p>
    <div class="post" v-html="body"></div>
  </main>
</template>

<script>
import axios from 'axios'
require('dotenv').config()

export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(
      `https://${process.env.CMS_URL}/api/v1/blog/${params.slug}`,
      {
        headers: { 'X-API-KEY': process.env.CMS_APIKEY }
      }
    )
    return data
  }
}
</script>
