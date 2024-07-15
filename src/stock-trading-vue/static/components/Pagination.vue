<script setup lang="ts">
const props = defineProps<{
    pageCount: number,
    currentPage: number,
}>()

const emit = defineEmits(['changePage'])

</script>

<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" :class="currentPage>1?'':'disabled'">
                <a class="page-link" href="#" @click="$emit('changePage', 1)" aria-label="First">
                    <i class="bi bi-arrow-bar-left"></i>
                </a>
            </li>
            <li class="page-item" :class="currentPage>1?'':'disabled'">
                <a class="page-link" href="#" @click="$emit('changePage', currentPage-1)" aria-label="Previous">
                    <i class="bi bi-arrow-left-short"></i>
                </a>
            </li>
            <li v-for="p in pageCount" :key="p" class="page-item" :class="[currentPage==p?'disabled':'']">
                <a class="page-link" href="#" @click="$emit('changePage', p)">{{ p }}</a>
            </li>
            <li class="page-item" :class="currentPage<pageCount?'':'disabled'">
                <a class="page-link" href="#" @click="$emit('changePage', currentPage+1)" aria-label="Next">
                    <i class="bi bi-arrow-right-short"></i>
                </a>
            </li>
            <li class="page-item" :class="currentPage<pageCount?'':'disabled'">
                <a class="page-link" href="#" @click="$emit('changePage', pageCount)" aria-label="Last">
                    <i class="bi bi-arrow-bar-right"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>
