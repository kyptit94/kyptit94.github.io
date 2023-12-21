<template>
    <div>
        <div class="control">
            <label>Tiêu đề</label>
            <input v-model="title" class="input">
        </div>
        <v-md-editor v-model="content" @save="saveFile" height="calc(100vh - 30px)"></v-md-editor>
    </div>
</template>
<style>
    .control {
        display: flex;
        align-items: center;
        margin: 5px;
    }

    .control label {
        margin-right: 10px;
    }

    .control input {
        border: 1px solid rgb(245, 241, 241);
        border-radius: 5px;
        padding: 10px;
        flex: 1;
    }
</style>
<script>
export default {
    data() {
        return {
            title: "",
            content: ""
        }
    },
    methods: {
        async saveFile() {
            let fileContent = `---
title: Introduction and Features of Geek Blog
cover_title: Introduction
path: /introduction
date: 2021-10-19
summary: Geek blog is a starter boilerplate for Gridsome which is a static site generator powered by Vue.
tags: ['intro', 'features']
categories: ['introduction']
thumbnail: ./introduction.png
---

` + this.content
            const blob = new Blob([fileContent], { type: "text/plain" });
            if( window.showSaveFilePicker ) {
                const handle = await showSaveFilePicker({
                    suggestedName: "test"
                });
                const writable = await handle.createWritable();
                await writable.write( blob );
                writable.close();
            }
            else {
                const link = document.createElement('a');
                link.style.display = 'none';
                const url = window.URL.createObjectURL(blob);
                window.URL.revokeObjectURL(link.href);
                link.href = url;
                link.download = "test.md";
                link.click()
            }
        }
    }
}
</script>