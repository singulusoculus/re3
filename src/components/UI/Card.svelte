<script>
    export let size = 'large'
    export let contentAlign = 'center'
    export let color = 'white'

</script>

<style>
    .card {
        padding: 3rem;
        border-radius: 2px;
        box-shadow: var(--shadow-dark);
        --webkit-box-shadow: var(--shadow-dark);
        /* box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
        --webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2); */
        /* width: 100%; */
        margin: 1rem;
    }

    .card-content {
        /* display: flex; */
    }

    .size-full {
        width: 100%;
    }

    .size-large {
        width: 80%;
    }

    .size-medium {
        width: 60%;
    }

    .size-small {
        width: 40%;
    }

    .content-align-left {
        justify-content: left;
    }

    .content-align-center {
        justify-content: center;
    }

    .color-white {
        background-color: #fff;
    }

    .color-grey {
        background-color: var(--color-grey-light-2)
    }


</style>

<div class="card size-{size} color-{color}">
    <div class="card-content content-align-{contentAlign}">
        <slot></slot>
    </div>
</div>