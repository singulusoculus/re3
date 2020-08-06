<script>

    export let tableHeaders
    export let tableRows
    export let highlight = false
    export let responsive = false
    export let striped = false

</script>

<style>
    .table-wrapper {
        margin: 2rem 0;
        font-size: 1.6rem;
        width: 60%;
    }

    table {
        width: 100%;
        display: table;
        border-collapse: collapse;
        border-spacing: 0;
    }

    table, th, td {
        border: none;
    }

    thead {
        color: rgba(0,0,0,0.6);
    }

    table.striped tr {
        border-bottom: none;
    }

    td, th {
        padding: 15px 10px;
    }

    td, th {
        /* padding: 15px 5px; */
        display: table-cell;
        text-align: left;
        vertical-align: middle;
        border-radius: 2px;
    }

    table.striped>tbody>tr:nth-child(odd) {
        background-color: rgba(242,242,242,0.5);
    }

    table.striped>tbody>tr>td {
        border-radius: 0;
    }

    table.highlight>tbody>tr {
        -webkit-transition: background-color .25s ease;
        transition: background-color .25s ease;
    }

    table.highlight>tbody>tr:hover {
        background-color: rgba(242,242,242,0.5);
    }

    @media only screen and (max-width: 992px) {
        table.responsive-table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            display: block;
            position: relative;
        }
    }

</style>

<div class="table-wrapper">
    <table class:striped class:highlight class:responsive>
        <thead>
            <tr>
                {#each tableHeaders as header}
                <th>{header}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each tableRows as row, r}
            <tr>
                {#each row as item}
                    <td>{item}</td>
                {/each}
            </tr>
            {/each}
        </tbody>
    </table>
</div>