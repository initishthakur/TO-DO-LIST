import React, { useEffect, useState } from 'react';
import '../assets/css/ToDoList.css'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import {
    handleSubmit,
    handleUpdate,
    handleInput,
    handleKeyDown,
    handlePriority
} from './Validations';


const ToDoList = (props) => {

    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [priority, setPriority] = useState('Low')


    useEffect(() => {
        if (props.updateData) {
            setInput(props.updateData.task)
            setPriority(props.updateData.priority)
        }
    }, [props.updateData])

    

    return (

        <div className='todolist-outer'>

            <h2>Add To-Do</h2>
            <div className=' row'>
                <div className='col-6'>

                    <FloatingLabel controlId="floatingPassword" label="Enter To Do">
                        <Form.Control type="text"
                            placeholder="Enter To-Do"
                            value={input}
                            maxLength={25}
                            onChange={(e) => handleInput(
                                e,
                                setError,
                                setInput)}
                            onKeyDown={(e) =>
                                handleKeyDown(
                                    e,
                                    props,
                                    input,
                                    setInput,
                                    setError,
                                    error,
                                    priority,
                                    setPriority,)}
                            style={{ width: '200px' }}

                        />
                    </FloatingLabel>
                </div>
                <div className='col-3'>

                    <FloatingLabel controlId="floatingSelect" label="Priority" >
                        <Form.Select value={priority}
                            onChange={(e) =>
                                handlePriority(e, setPriority)}
                            className='custom-select'>
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </Form.Select>
                    </FloatingLabel>
                </div>

                <div className='col-3 buttons-div'>
                    {props.updateData ?
                        <button className='btn btn-primary'
                            onClick={() => handleUpdate(
                                input,
                                setInput,
                                setError,
                                error,
                                priority,
                                setPriority,
                                props
                            )}>Update</button>
                        :
                        <button className='btn btn-primary'
                            onClick={() => handleSubmit(
                                input,
                                setInput,
                                setError,
                                error,
                                priority,
                                setPriority,
                                props)}
                        >Add</button>}
                </div>
            </div>
            {error && <span className='danger'>{error}</span>}


        </div>


    )
}

export default ToDoList