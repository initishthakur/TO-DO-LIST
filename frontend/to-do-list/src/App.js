
import './App.css';
import ToDoList from './components/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import ToDoTable from './components/ToDoTable';
import 'antd/dist/reset.css';
import { message } from 'antd';
message.config({
    maxCount : 1
})



function App() {
  const [isloading, setIsLoading] = useState(false)
  const [updateData, setUpdateData] = useState('')
  
  return (
    <>
      <div className='outer'>
          <div className='outer-div-one'>
            <div className='inner-div'>
            <div>
              <ToDoList 
                isloading={isloading}
                setIsLoading={setIsLoading}
                updateData={updateData}
                setUpdateData={setUpdateData}
                message={message}
               
              />
            </div>
            <div >
              <ToDoTable
                updateData={updateData}
                setUpdateData={setUpdateData}
                isloading={isloading}
                setIsLoading={setIsLoading}
                message={message}
               
              />
            </div>
            </div>
          </div>
        
      </div>
  
    </>
  );
}

export default App;
