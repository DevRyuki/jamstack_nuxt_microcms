<template>
<div>
  <ul>
    <li v-for="content in contents" :key="content.id">
      <nuxt-link :to="`/post/${content.id}`">
        {{ content.title }}
      </nuxt-link>
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
require('dotenv').config()

export default {
  async asyncData () {
    const { data } = await axios.get(
      // your-service-id部分は自分のサービスidに置き換えてください
      `https://${process.env.CMS_URL}/api/v1/blog`,
      {
        // your-api-key部分は自分のapi-keyに置き換えてください
        headers: { 'X-API-KEY': process.env.CMS_APIKEY }
      }
    )
    return data
  }
}
</script>
