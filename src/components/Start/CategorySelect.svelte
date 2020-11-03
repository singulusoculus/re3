<script>
    import Select from '../../components/UI/Select.svelte'
    import { category } from '../../stores/category.js'
    import step from '../../stores/currentStep';
    import enabledStore from '../../stores/stepStatus';

    const browserDefault = true

    const categoryOptions = [
        {
            value: 0,
            name: 'Select a category...',
            selected: true
        },
        {
            value: 1,
            name: 'Beverages',
        },
        {
            value: 2,
            name: 'Board Games'
        },
    ]

    const handleChangeSelection = (value) => {
        if (!browserDefault) {
            const selectedValue = value.detail
            
            categoryOptions.forEach(o => {
                delete o.selected
            })
    
            let newOption = categoryOptions.find(o => o.value === selectedValue)
            let index = categoryOptions.findIndex(o => o.value === selectedValue)
            newOption = {...newOption, selected:true}
            categoryOptions[index] = newOption
        } else {
            console.log(value.detail);
            category.set(value.detail)
            enabledStore.enableList()
            step.set('list')
        }
    }

</script>

<style></style>

<Select options={categoryOptions} on:changeSelection={handleChangeSelection} browserDefault />
