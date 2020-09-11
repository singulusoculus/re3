<script>
    import Collapsible from '../UI/Collapsible.svelte'
    import Collection from '../UI/Collection.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import Button from '../UI/Button.svelte'
    import Divider from '../UI/Divider.svelte'
    import RadioButtons from '../UI/RadioButtons.svelte'
    import Loading from '../UI/Loading.svelte'

    import listStore from './list-store.js' 
    import { getBGGData } from './bgg-fetch.js'
    import { sortListData } from './common'
    import uuidv4 from 'uuid'

    export let list = []
    let searchText = ''
    let searchType = 'boardgames'
    let hasSearchResults = false
    let sortBy = 'bgg-rank' 

    const radioButtons = [
        {
            id: 'boardgames',
            name: 'bgg-search-type',
            title: 'Board Games',
            selected: true
        },
        {
            id: 'expansions',
            name: 'bgg-search-type',
            title: 'Expansions',
            selected: false
        }
    ]
    
    let isLoading = false

    $: filteredList = list.filter(l => l.source === 'bgg-search' && !l.addedToList)
    $: exactSearch = searchText.charAt(0) === `"` && searchText.charAt(searchText.length -1) === `"` ? true : false
    $: totalAdded = list.filter(l => l.addedToList).length

    const addListItem = (event) => {
        listStore.addListItem(event.detail)
    }

    const handleBGGSearchRequest = async () => {
        isLoading = true
        
        let localSearchText = searchText.replace(/["]+/g, '')

        // Clear search data from store
        listStore.resetSearchData()

        if (exactSearch) {
            localSearchText = localSearchText.replace(/["]+/g, '')
        }

        // gameDetails = await getBGGSearchResults(localSearchText, exactSearch, searchType)

        listStore.addSearchData(await getBGGSearchResults(localSearchText, exactSearch, searchType))

        isLoading = false
        hasSearchResults = true
    }

    // Search Functions
    const getBGGSearchResults = (localSearchText, exactSearch, searchType) => new Promise(async (resolve, reject) => {
        let searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${localSearchText}`

        if (exactSearch) {
            searchUrl += `&exact=1`
        }

        let results

        if (searchType === 'boardgames') {
            // when asking for type boardgame, bgg returns both boardgame and boardgameexpansion types but does not label the expansions properly.
            // I have to request expansions explicitly and then filter based on that list
            let searchUrlBG = `${searchUrl}&type=boardgame`
            let bgResults = await getBGGData(searchUrlBG)

            let searchUrlEx = `${searchUrl}&type=boardgameexpansion`
            let exResults = await getBGGData(searchUrlEx)

            let expansionIds = []
            exResults.forEach((item) => {
            expansionIds.push(item['@attributes'].id)
            })

            results = bgResults.filter((i) => expansionIds.indexOf(i['@attributes'].id) < 0, expansionIds)
        } else {
            let searchUrlEx = `${searchUrl}&type=boardgameexpansion`
            results = await getBGGData(searchUrlEx)
        }

        let bggSearchItems = []
        results.forEach((i) => {
            bggSearchItems.push(i)
        })

        // Filter out duplicate bggIds
        bggSearchItems = bggSearchItems.filter((list, index, self) => self.findIndex(l => l['@attributes'].id === list['@attributes'].id) === index)

        // Filter for games with primary names only
        bggSearchItems = bggSearchItems.filter(item => item.name['@attributes'].type === 'primary')

        // Cut list down to 50
        bggSearchItems = bggSearchItems.slice(0, 50)

        let bggIds = []
        bggSearchItems.forEach((item) => {
            if (item.name['@attributes'].type === 'primary') {
            bggIds.push(item['@attributes'].id)
            }
        })

        let gameDetails = await getBGGGameDetailData(bggIds)
        gameDetails = sortListData(gameDetails, 'bgg-rank')

        resolve(gameDetails)
    });

    const getBGGGameDetailData = (bggIds) => {
        return new Promise(async (resolve, reject) => {
            let dataURL = 'https://boardgamegeek.com/xmlapi2/thing?stats=1&id='
            bggIds.forEach((id) => {
            dataURL += id + ','
            })

            const results = await getBGGData(dataURL)
            let items = []

            results.forEach((i) => {
            items.push(i)
            })

            resolve(createBGGSearchList(items))
        })
    }

    const createBGGSearchList = (items) => {

        let bggGameData = []
        items.forEach((item) => {
            let bggGameDataDetails = {}

            bggGameDataDetails.id = uuidv4()
            bggGameDataDetails.source = 'bgg-search'
            bggGameDataDetails.imageOriginal = item.image ? item.image['#text'] : ''
            bggGameDataDetails.image = item.thumbnail ? item.thumbnail['#text'] : ''
            bggGameDataDetails.bggId = item['@attributes'].id
            bggGameDataDetails.processedImage = ''

            // Stats
            // .statistics.ratings.average["@attributes"].value
            const stats = item.statistics.ratings
            bggGameDataDetails.averageRating = stats.average['@attributes'].value

            // bggRank
            if (!Array.isArray(stats.ranks.rank)) {
            stats.ranks.rank = [stats.ranks.rank]
            }

            const rank = stats.ranks.rank.find((e) => e['@attributes'].name === 'boardgame')
            if (rank['@attributes'].value === 'Not Ranked') {
            bggGameDataDetails.bggRank = 1000000
            } else {
            bggGameDataDetails.bggRank = parseInt(rank['@attributes'].value)
            }

            // Names
            if (!Array.isArray(item.name)) {
            item.name = [item.name]
            }

            item.name.forEach((name) => {
            if (name['@attributes'].type === 'primary') {
                bggGameDataDetails.name = name['@attributes'].value
            }
            })

            bggGameData.push(bggGameDataDetails)
        })
        return bggGameData
    }

</script>

<style>
    p {
        font-style: italic;
    }

    .search-controls {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>

<Collapsible title="BGG Search" icon="search" isOpen={false}>
    <p class="center">Note: Each search returns at most 50 results at a time. If you do not see what you are looking for be more specific or try an exact search by wrapping your search text in double quotes. Ex: "Risk". Please keep special characters in mind.</p>
    <form>
        <TextInput label="Search Text" id="bgg-search-text" on:textChange="{(event) => searchText = event.detail}" />
        <div class="search-controls">
            <div>
                <span class="bgg-filter-heading">Search For:</span>
                <RadioButtons {radioButtons} on:select="{(event) => searchType = event.detail}" />
            </div>
            <div>
                <Button text="Search" icon="arrow_forward" on:click={handleBGGSearchRequest} disabled={isLoading}/>
            </div>
        </div>
    </form>
    {#if isLoading}
        <Loading />
    {/if}
    {#if hasSearchResults}
        <Divider />
        <Collection games={filteredList} icon="add" on:add="{addListItem}" />
    {/if}
</Collapsible>