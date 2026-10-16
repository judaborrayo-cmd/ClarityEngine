import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'.',testMatch:'navigation.spec.ts',timeout:30000,workers:1,reporter:[['list'],['json',{outputFile:'../../output/navigation-review/test-results.json'}]],use:{baseURL:'http://127.0.0.1:4316',trace:'off'},projects:[{name:'chromium',use:{browserName:'chromium'}},{name:'webkit',use:{browserName:'webkit'}}]});
