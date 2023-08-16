<script setup lang="ts">
import { useTeamStore } from '@/store/team_store';
const teamStore = useTeamStore();
</script>

<template>
    <div class="switch">
        <div @click="teamStore.setLayout(true)" class="switch-item" :class="{ active: teamStore.layout === true }">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H4V5H0V0Z" />
                <path d="M6 0H16V5H6V0Z" />
                <path d="M0 6H4V10H0V6Z" />
                <path d="M6 6H16V10H6V6Z" />
                <path d="M0 11H4V16H0V11Z" />
                <path d="M6 11H16V16H6V11Z" />
            </svg>
        </div>
        <div @click="teamStore.setLayout(false)" class="switch-item" :class="{ active: teamStore.layout === false }">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H7V7H0V0Z" />
                <path d="M9 0H16V7H9V0Z" />
                <path d="M0 9H7V16H0V9Z" />
                <path d="M9 9H16V16H9V9Z" />
            </svg>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.switch {
    display: flex;
    align-items: center;
    width: auto;
    background-color: #fff;
    border-radius: 24px;
    box-shadow: var(--box-shadow);
    padding: 0.3rem 0.6rem;

    .switch-item {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 35px;
        width: 35px;
        border-radius: 100%;
        transition: 0.4s;

        svg path {
            fill: #F2E6E4;
        }

        &:hover svg path {
            transition: 0.4s;
            fill: #ffb3a6;
        }
    }

    .active {
        background-color: #FBCFC7;

        svg path {
            fill: var(--main-color);
        }

        &:hover svg path {
            fill: var(--main-color);
        }
    }
}
</style>