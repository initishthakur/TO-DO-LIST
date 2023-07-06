export const handleSubmit = (
    input,
    setInput,
    setError,
    error,
    priority,
    setPriority,
    props) => {


    if (input === '') {
        setError('Please add your To-Do')
    } else if (! /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(input)) {
        setError('Please enter alphabets and numbers only')
    }
    else if (error === '') {

        props.setIsLoading(true)

        fetch('http://localhost:5000/addToDo', {
            method: 'post',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                task: input,
                priority: priority
            })
        })
            .then((res) => res.json())
            .then((data) => {
                props.setIsLoading(false)

                if (data.error) {
                    props.message.error(data.error)
                } else {
                    props.message.success(data.message)
                }
                setInput('')
                setPriority('Low')
            })
            .catch((err) => console.log(err))
    }
}


export const handleUpdate = (
    input,
    setInput,
    setError,
    error,
    priority,
    setPriority,
    props
) => {
    if (input === '') {
        setError('Please add your To-Do')
    } else if (! /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(input)) {
        setError('Please enter alphabets and numbers only')
    }
    else if (error === '') {

        props.setIsLoading(true)


        fetch(`http://localhost:5000/updateTask/${props.updateData._id}`, {
            method: 'put',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                task: input,
                priority: priority
            })
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.error) {
                    props.message.error(data.error)
                } else {
                    props.message.success(data.message)
                }
                props.setIsLoading(false)
                props.setUpdateData('')
                setInput('')
                setPriority('Low')
            })
            .catch((err) => console.log(err))
    }

}

export const handleInput = (
    e,
    setError,
    setInput) => {

    if (e.target.value === '') {
        setError('Please add your To-Do')
    } else if (! /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(e.target.value)) {
        setError('Please enter alphabets and numbers only')

    } else {
        setError('')
    }
    setInput(e.target.value)
}

export const handleKeyDown = (e, props,
    input,
    setInput,
    setError,
    error,
    priority,
    setPriority,) => {

    if (e.key === 'Enter') {
        if (props.updateData) {
            handleUpdate(
                input,
                setInput,
                setError,
                error,
                priority,
                setPriority,
                props
            )
        } else {
            handleSubmit(
                input,
                setInput,
                setError,
                error,
                priority,
                setPriority,
                props
            )
        }

    }
}


export const handlePriority = (e, setPriority) => {
    setPriority(e.target.value)
}

export const handleDelete = (
    setShow,
    props,
    selectedId
) => {

    fetch(`http://localhost:5000/deletetask/${selectedId._id}`, {
        method: 'delete'
    }).then((res) => res.json())
        .then((data) => {
            if (data.error) {
                props.message.error(data.error)
                setShow(false)
            } else {
                props.message.success(data.message)
                setShow(false)
            }
        })
        .catch((err) => console.log(err))
}



export const handleEdit = (item, props) => {
    props.setUpdateData(item)
}

export const handleSort = (
    e,
    data,
    setData,
    originalData) => {


    if (e.target.value === "High") {
        const sortedData = [...data].sort((a, b) => (

            a.priority > b.priority ? 1 : -1)
        );
        setData(sortedData);
    } else if (e.target.value === "Low") {
        const sortedData = [...data].sort((a, b) => (

            a.priority < b.priority ? 1 : -1)
        );
        setData(sortedData);
    } else {
        setData(originalData)
    }
}


export const handleCheck = (e,
    item,
    props,
    checkBox,
    setCheckBox) => {

    if (checkBox.includes(e.target.name)) {

        props.setIsLoading(true)

        fetch(`http://localhost:5000/updateData/${item._id}`, {
            method: 'put'
        }).then(res => res.json())
            .then((data) => {
                props.setIsLoading(false)
            }

            )
            .catch((err) => console.log(err))
        setCheckBox(checkBox.filter((data) => {
            return data !== e.target.name;
        })
        )
    } else {

        props.setIsLoading(true)
        setCheckBox([...checkBox, e.target.name])

        fetch(`http://localhost:5000/updateDetails/${item._id}`, {
            method: 'put'
        }).then(res => res.json())
            .then((data) => {
                if (data.error) {
                    props.message.error(data.error)
                } else {
                    props.message.success(data.message)
                }
                props.setIsLoading(false)
            })
            .catch((err) => console.log(err))
    }


}

export const handleClose = (setShow) => setShow(false);


export const handleShow = (
    item,
    setShow,
    setSelectedId) => {
    setSelectedId(item)
    setShow(true)
};

export const handleDragEnd = (
    result,
    data,
    setData) => {
    console.log(result);
    if (!result.destination) {
        return;
    }

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
};