
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../assets/css/ToDoTable.css'
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Loader from './Loader';
import {
    handleDelete,
    handleEdit,
    handleSort,
    handleCheck,
    handleClose,
    handleShow,
    handleDragEnd
} from './Validations';

const ToDoTable = (props) => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState('')
    const [checkBox, setCheckBox] = useState([])
    const [originalData, setOriginalData] = useState([])




    useEffect(() => {
        fetch('http://localhost:5000/getList', {
            method: 'get'
        }).then((res) => res.json())
            .then((data) => {
                setData(data.data)
                setOriginalData(data.data)
            }
            )
    }, [show, props.isloading])

    useEffect(() => {
        data.map((item) => {

            if (item.completed === true) {
                checkBox.push(item.task)
            }
            return null
        });


    }, [data, checkBox]);


    // const handleDragEnd = (result) => {
    //     console.log(result);
    //     if (!result.destination) {
    //         return;
    //     }

    //     const items = Array.from(data);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);

    //     setData(items);
    // };



    return (
        <>

            {props.isloading ? <Loader /> :
                <div style={{ width: '450px', marginLeft: '50px' }} className='table-container'>
                    {data.length === 0 ? " No Task in your to-do " :
                        <DragDropContext onDragEnd={(result) => handleDragEnd(result, data, setData)}>
                            <table >
                                <thead className='test2'>
                                    <tr className="test">
                                        <th></th>
                                        <th>To Do</th>
                                        <th >
                                            <div className='td-table' style={{ width: '120px' }}><br />
                                                Sort by Priority
                                                <select style={{ height: '20px' }}
                                                    onChange={(e) => handleSort(
                                                        e,
                                                        data,
                                                        setData,
                                                        originalData)}>
                                                    <option value='none'>none</option>
                                                    <option value='Low'>Low</option>
                                                    <option value='High'>High</option>
                                                </select>
                                            </div>
                                        </th>
                                        <th style={{ textAlign: 'center' }}>Actions</th>

                                    </tr>
                                </thead>

                                <Droppable droppableId='tbody'>
                                    {(provided) => (
                                        <tbody ref={provided.innerRef}
                                            {...provided.droppableProps}
                                         
                                            >
                                            {data &&
                                                data.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item._id}
                                                            draggableId={item._id}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <tr
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                              
                                                                >
                                                                    <td style={{ width: '40px' }}>
                                                                        <input
                                                                            type='checkbox'
                                                                            name={item.task}
                                                                            checked={item.completed}
                                                                            onChange={(e) =>
                                                                                handleCheck(
                                                                                    e,
                                                                                    item,
                                                                                    props,
                                                                                    checkBox,
                                                                                    setCheckBox
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>

                                                                    {item.completed ? (
                                                                        <td style={{ width: '150px' }} className='disable-text'>
                                                                            {item.task}
                                                                        </td>
                                                                    ) : (
                                                                        <td style={{ width: '170px' }}>{item.task}</td>
                                                                    )}

                                                                    <td>{item.priority}</td>

                                                                    <td style={{ width: '120px' }}>
                                                                        <span>
                                                                            {item.completed ? (
                                                                                <button className='btn btn-basic disable-button'>
                                                                                    <EditRoundedIcon />
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    className='btn btn-basic'
                                                                                    onClick={() => handleEdit(item, props)}
                                                                                >
                                                                                    <EditRoundedIcon />
                                                                                </button>
                                                                            )}
                                                                            <button
                                                                                className='btn btn-basic'
                                                                                onClick={() =>
                                                                                    handleShow(item, setShow, setSelectedId)
                                                                                }
                                                                            >
                                                                                <DeleteRoundedIcon />
                                                                            </button>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>



                            </table>
                        </DragDropContext>
                    }

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure to delete <b>{selectedId.task} </b>task ?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"
                                onClick={() => handleClose(
                                    setShow
                                )}>
                                Close
                            </Button>
                            <Button variant="danger"
                                onClick={() => handleDelete(
                                    setShow,
                                    props,
                                    selectedId)}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }
        </>
    )
}
export default ToDoTable