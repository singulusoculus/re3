<script>
    import Collapsible from '../UI/Collapsible.svelte'
    import Collection from '../UI/Collection.svelte'
    import Button from '../UI/Button.svelte'
    import listStore from '../../stores/listStore.js'
    import enabledStore from '../../stores/stepStatus'


    export let list = []

    $: addedList = list.filter(i => i.addedToList)
    $: addedList.length === 0 ? enabledStore.disableStep('rank') : enabledStore.enableStep('rank')

    const removeListItem = (event) => {
        listStore.removeListItem(event.detail)
    }

    const clearList = () => {
        listStore.clearList()
    }
</script>

<style>

</style>

<Collapsible title="Your List" icon="view_list" isOpen={true}>
    <span slot="header-button">
        <Button icon="delete" text="Clear" on:click="{clearList}" />
    </span>
    <Collection games={addedList} icon="delete" on:add="{removeListItem}" />
</Collapsible>
