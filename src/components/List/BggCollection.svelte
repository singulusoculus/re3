<script>
    import Collapsible from '../UI/Collapsible.svelte'
	import TextInput from '../UI/TextInput.svelte'
	import Switch from '../UI/Switch.svelte'
    import Button from '../UI/Button.svelte'
    import Divider from '../UI/Divider.svelte'
    import Checkbox from '../UI/Checkbox.svelte'
    import Range from '../UI/Range.svelte'
    import Collection from '../UI/Collection.svelte'
    import Loading from '../UI/Loading.svelte'

    import { fade, fly } from 'svelte/transition'
    import listStore from '../../stores/listStore.js'
    import { getBGGData } from '../../js/bgg-fetch'
    import uuidv4 from 'uuid'


    export let list = []

    $: allLength = list.filter(l => l.source === 'bgg-collection').length
    $: addedLength = list.filter(l => l.source === 'bgg-collection' && l.addedToList).length
    $: totalAdded = list.filter(l => l.addedToList).length
    $: filteredList = filterBGGCollection(list)

    let bggUserName = ''
    let getExpansions = false

    // Filters
    let cb = {
        own: true,
        fortrade: false,
        prevowned: false,
        want: false,
        wanttobuy: false,
        wanttoplay: false,
        wishlist: false,
        played: true,
        rated: false
    }

    let minRating = 5
    let searchText = ''

    let hasCollection = false
    let isLoading = false

    const filterBGGCollection = (list) => {
        let data = []

        let fullList = list.filter(l => l.source === 'bgg-collection' && !l.addedToList)

        // gets only true filters
        const listTypeFilters = Object.keys(cb).filter((key) => cb[key] === true)

        // filter the collection data for the filters marked as true
        listTypeFilters.forEach((filter) => {
            const newList = fullList.filter((item) => item[filter])
            newList.forEach((item) => {
                data = [...data, item]
            })
        })

        // Filter duplicates out
        data = data.filter((list, index, self) => self.findIndex(l => l.id === list.id) === index)

        // Filter for Personal Rating
        data = data.filter((item) => item.rating >= minRating)

        // Text Filter
        data = data.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()))

        // Sort
        data = sortListByAlpha(data)
        return data
    }

    const sortListByAlpha = (list) => {
        return list.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        } else {
          return 0
        }
      })
    }

	const addListItem = async (event) => {
        listStore.addListItem(event.detail)
	}

    const toggleCollection = () => {
        hasCollection = !hasCollection
    }

    const handleBGGCollectionRequest = async () => {
        if (bggUserName === '') {
            alert('Pleae input your BGG user name')
            return
        } else {
            isLoading = true
            try {
                listStore.addListData(await getBGGCollection(bggUserName, getExpansions))
                isLoading = false
                hasCollection = true
            } catch(err) {
                isLoading = false
                throw err
            }
        }
    }

    const handleBGGCollectionChange = () => {
        listStore.resetBGGCollection()
        hasCollection = false
    }

    const handleFilterChange = () => {
        filteredList = filterBGGCollection(list)
    }

    // Collection Functions
    const getBGGCollection = (user, expansions) => new Promise(async (resolve, reject) => {
        // disable submit button

        let queryUrl = `https://www.boardgamegeek.com/xmlapi2/collection?username=${user}&stats=1`

        if (!expansions) {
            queryUrl += '&excludesubtype=boardgameexpansion'
        }
            let bggList

            try {
            let results = await getBGGData(queryUrl)   
            bggList = createBGGCollectionList(results)
        
            queryUrl += '&played=1'
            let playedResults = await getBGGData(queryUrl)
            let played = createBGGCollectionList(playedResults)
        
            played.forEach((item) => {
                bggList.push(item)
            })
        
            bggList = bggList.filter((list, index, self) => self.findIndex(l => l.bggId === list.bggId) === index)
            resolve(bggList)
            } catch (err) {
            console.log(err);
            reject(err)
            }


    }) 

    const createBGGCollectionList = (data) => {
        let items = data
        let bggList = []

        if (!Array.isArray(items)) {
            items = [items]
        }

        items.forEach((item) => {
            const statusAttributes = item.status['@attributes']

            const obj = {
            id: uuidv4(),
            name: item.name ? item.name['#text'] : 'No Title',
            source: 'bgg-collection',
            // sourceType: 'collection',
            imageOriginal: item.image ? item.image['#text'] : '',
            image: item.thumbnail ? item.thumbnail['#text'] : '',
            processedImage: '',
            // yearPublished: item.yearpublished ? parseInt(item.yearpublished['#text']) : 0,
            bggId: item['@attributes'].objectid,
            own: statusAttributes.own === '1',
            fortrade: statusAttributes.fortrade === '1',
            prevowned: statusAttributes.prevowned === '1',
            want: statusAttributes.want === '1',
            wanttobuy: statusAttributes.wanttobuy === '1',
            wanttoplay: statusAttributes.wanttoplay === '1',
            wishlist: statusAttributes.wishlist === '1',
            played: item.numplays['#text'] > 0,
            plays: item.numplays['#text'],
            rated: item.stats['rating']['@attributes'].value !== 'N/A',
            rating: item.stats['rating']['@attributes'].value === 'N/A' ? 0 : parseInt(item.stats['rating']['@attributes'].value),
            addedToList: false
            }

            // if (listData.map(e => e.bggId).indexOf(obj.bggId) > -1) {
            // obj.addedToList = true
            // }

            bggList.push(obj)
        })

        return bggList
    }

</script>

<style>
    .get-collection-controls {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .section-title {
        line-height: 32px;
        font-size: 2.5rem;
        font-weight: 300;
        margin: 1rem .8rem 0 .8rem;
    }

    .change-user {
        text-emphasis: underline;
        cursor: pointer;
        color: blue;
    }

    .bgg-filter-heading {
        font-weight: 600;
        font-size: 1.6rem;
        margin: 1rem 0;
    }

    .list-types-wrapper {
        display: flex;
        justify-content: space-around;
    }

    .list-types {
        display: flex;
        flex-direction: column;
    }

    .range-slider {
        width: 85%;
        margin: 0 auto;
    }

    .search-collection {
        width: 90%;
        margin: 0 auto;
    }
</style>


<Collapsible title="BGG Collection" icon="cloud_download" isOpen={true}>
    {#if !hasCollection}
    <div class="bgg-collection-request" out:fade in:fade="{{delay: 300}}">
        <form>
            <TextInput label="BGG User Name" id="bgg-username" on:textChange="{(event) => bggUserName = event.detail.trim().replace(/ /g, '%20')}" />
            <div class="get-collection-controls">
                <Switch title="Include Expansions?" on:clicked="{(event) => getExpansions = event.detail}" />
                <Button text="Go" icon="arrow_forward" on:click={handleBGGCollectionRequest} disabled={isLoading} />
            </div>
        </form>
    </div>
        {#if isLoading}
        <div transition:fade>
            <Loading />
        </div>
        {/if}
    {:else}
    <div class="bgg-collection" in:fly="{{y: 300, delay: 500, duration: 300}}" out:fly="{{ delay:0, duration: 300, y: 300}}">
        <div class="bgg-collection-header">
            <p class="section-title center">BGG Collection: {bggUserName}</p>
            <p class="center change-user" on:click={handleBGGCollectionChange}>(Change)</p>
        </div>
        <Divider />
        <div class="bgg-collection-filters">
            <p class="section-title">Filters</p>
            <div class="checkbox-filters">
                <p class="bgg-filter-heading center">List Types</p>
                <div class="list-types-wrapper" on:click="{handleFilterChange}">
                    <div class="list-types">
                        <Checkbox title="Own" cbClass="own" isChecked={cb.own} on:clicked="{(event) => {cb.own = !event.detail}}" />
                        <Checkbox title="Played" cbClass="played" isChecked={cb.played} on:clicked="{(event) => {cb.played = !event.detail}}" />
                        <Checkbox title="Rated" cbClass="rated" isChecked={cb.rated} on:clicked="{(event) => {cb.rated = !event.detail}}" />
                    </div>
                    <div class="list-types">
                        <Checkbox title="Prev Owned" cbClass="prevowned" isChecked={cb.prevowned} on:clicked="{(event) => {cb.prevowned = !event.detail}}" />
                        <Checkbox title="For Trade" cbClass="fortrade" isChecked={cb.fortrade} on:clicked="{(event) => {cb.fortrade = !event.detail}}" />
                        <Checkbox title="Wishlist" cbClass="wishlist" isChecked={cb.wishlist} on:clicked="{(event) => {cb.wishlist = !event.detail}}" />
                    </div>
                    <div class="list-types">
                        <Checkbox title="Want to Buy" cbClass="wanttobuy" isChecked={cb.wanttobuy} on:clicked="{(event) => {cb.wanttobuy = !event.detail}}" />
                        <Checkbox title="Want to Play" cbClass="wanttoplay" isChecked={cb.wanttoplay} on:clicked="{(event) => {cb.wanttoplay = !event.detail}}" />
                        <Checkbox title="Want in Trade" cbClass="wanttotrade" isChecked={cb.wanttotrade} on:clicked="{(event) => {cb.wanttotrade = !event.detail}}" />
                    </div>
                </div>
                <p class="bgg-filter-heading center">Min Personal Rating: {minRating}</p>
                <div class="range-slider" on:change="{handleFilterChange}">
                    <Range sliderValue={minRating} on:changed="{(event) => minRating = event.detail}" />
                </div>
                <div class="search-collection">
                    <TextInput icon="filter_list" placeholder="Search Collection" id="search-collection" on:textChange="{(event) => {searchText = event.detail; handleFilterChange()}}" />
                </div>
                <Divider />
                    <p class="section-title center">Filtered: {filteredList.length}  | Added: {addedLength} | Total: {allLength} </p>
                <Divider />
                <Collection games={filteredList} icon="add" on:add="{addListItem}"/>
            </div>
        </div>
    </div>
    {/if}
</Collapsible>