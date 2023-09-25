
<script lang="ts" setup>

const props = defineProps<{
    positiveBorderColor: boolean | undefined,

}>()

</script>

<template>
    <div
        :class="['block-content border-left', `${positiveBorderColor ? 'border-left__success' : (positiveBorderColor != undefined ? 'border-left__danger' : '')}`]">

        <div class="row mb-4">
            <!-- title -->
            <div class="col card__title">
                <slot name="title">

                </slot>
            </div>
            <!-- time -->
            <div class="col-auto">
                <font-awesome-icon icon="clock" class="me-2 " />
                <slot name="time">

                </slot>
            </div>

        </div>
        <!-- body -->
        <div class="row ">
            <slot name="body">

            </slot>
        </div>

        <!-- link -->
        <div class="row mt-2 info">
            <slot name="link">

            </slot>
        </div>

        <!-- footer -->
        <div class="row mt-4">
            <slot name="footer">

            </slot>
        </div>

        <!-- buttons -->
        <div class="row">
            <slot name="buttons">

            </slot>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.block-content {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    padding: 1.5rem 2rem;
    margin: 10px auto 20px auto;
    background: white;
}

.info {
    font-size: 16px;
    font-weight: bold;
    color: var(--second-color);
}

.border-left {
    border-left: 0.7rem solid gray;

    &__success {
        border-left-color: #95E09C;
    }

    &__danger {
        border-left-color: #FF8383;
    }
}


.card {
    &__title {
        color: #373737;
        font-size: 1.2rem;
    }
}
</style>