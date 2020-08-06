<script>
    import Card from '../UI/Card.svelte'
    import CategorySelect from './CategorySelect.svelte'
    import CurrentTopGamesTable from './CurrentTopGamesTable.svelte'
    import SectionHeading from '../UI/SectionHeading.svelte'
    import Divider from '../UI/Divider.svelte'
    import Button from '../UI/Button.svelte'

</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
        font-size: 2rem;
    }
</style>

<section>
    <Card size="medium" contentAlign="center" color="grey">
        <SectionHeading>What would you like to rank?</SectionHeading>
        <CategorySelect />
    </Card>

    <Divider />
    
    <SectionHeading>Current Top Games</SectionHeading>
    <Button text="See All Top Games" linkref="#" icon="chevron_right"/>
    <CurrentTopGamesTable />
</section>