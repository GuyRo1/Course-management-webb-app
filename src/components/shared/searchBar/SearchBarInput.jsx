const SearchBarInput = (props) => {

    const search = props.sendSearchTerm

    const onSubmit = event => {
        event.preventDefault()
        props.onSubmit()
    }

    const onChange = event => {
        event.preventDefault();
        search(event.target.value)
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={props.placeholder} onChange={onChange} />
        </form>
    )
}

export default SearchBarInput