<script>
    import Collapsible from '../UI/Collapsible.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import Button from '../UI/Button.svelte'
    import { category } from '../../stores/category'
    import listStore from '../../stores/listStore.js' 
    import uuidv4 from 'uuid'

    let categoryValue = $category.value
    let text = ''

    const handleAddTextItems = () => {
        const list = text.split('\n').filter((x) => (x !== (undefined || '')))
        console.log(list);
        text = ''

        const listToAdd = createListObject(list)
        listStore.addListData(listToAdd)

    }

    const createListObject = (data) => {
        let items = data
        let list = []

        if (!Array.isArray(items)) {
            items = [items]
        }

        items.forEach((item) => {
            const obj = {
            id: uuidv4(),
            name: item,
            source: 'text',
            // imageOriginal: '',
            // image: '',
            // processedImage: '',
            // bggId: '',
            // own: '',
            // fortrade: statusAttributes.fortrade === '',
            // prevowned: statusAttributes.prevowned === '',
            // want: statusAttributes.want === '',
            // wanttobuy: statusAttributes.wanttobuy === '',
            // wanttoplay: statusAttributes.wanttoplay === '',
            // wishlist: statusAttributes.wishlist === '',
            // played: '',
            // plays: '',
            // rated: '',
            // rating: '',
            addedToList: true
            }

            list.push(obj)
        })

        return list
    }


</script>

<style></style>

<Collapsible title="Text Entry" icon="playlist_add" isOpen={categoryValue === 2 ? false : true}>
    <Button icon="add" text="Add" on:click={handleAddTextItems} />
    <TextInput 
        type="textarea" 
        label="Enter items here (multiple lines allowed)" 
        id="textarea-input" 
        bind:text 
        on:textChange="{(data) => text = data.detail}"
    />
</Collapsible>