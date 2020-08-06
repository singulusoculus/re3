<script>
    import Table from '../../components/UI/Table.svelte'

    const tableHeaders = ['Rank', 'Game']
    const tableRows = [
        [1, 'Terraforming Mars'],
        [2, 'Scythe']
    ]

</script>

<style>

</style>

<Table tableHeaders={tableHeaders} tableRows={tableRows} striped={true} />