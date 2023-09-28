import { useState } from 'react'
import './styles/App.css'
import { v4 as uuidv4 } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CardComponent from './components/cards';


function App() {
  const [pending, setPending] = useState([]);
  const [done, setDone] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState("")

  const [formData, setFormData] = useState({
    heading: '',
    priority: 'low',
    finishTime: '',
  });


  const [open, setOpen] = useState(false);

  // functions
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (value) => {
    setSelectedPanel(value)
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { heading, priority, finishTime } = formData;

    if (!selectedPanel) {
      alert("No Panel is selected!")
      return;
    }

    if (!heading || !priority || !finishTime) {
      alert("Please fill the Details properly!")
      return;
    }

    if (selectedPanel === "Todo") {
      setPending((prev) => [...prev, {
        id: uuidv4(),
        title: heading,
        priority: priority,
        deadline: finishTime,
        status: 'pending'
      }]);
    } else if (selectedPanel === "In Progress") {
      setInprogress((prev) => [...prev, {
        id: uuidv4(),
        title: heading,
        priority: priority,
        deadline: finishTime,
        status: 'inProgress'
      }]);
    } else if (selectedPanel === "Compeleted") {
      setDone((prev) => [...prev, {
        id: uuidv4(),
        title: heading,
        priority: priority,
        deadline: finishTime,
        status: 'done'
      }]);
    }

    setFormData({
      heading: '',
      priority: 'low',
      finishTime: '',
    });
    setSelectedPanel("");

    setOpen(false);
  };

  // console.log(done, inprogress, pending); // success

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className='main-container'>
        <div className='wrapper'>
          <div className='Pending-col'>
            <div className='upperActionPanel'>
              <div className='add-pending'>
                To-do {pending.length}
              </div>
              <button className='Add-in-list' onClick={() => handleOpen("Todo")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className='todo-list'>
              {
                pending?.map((item) => {
                  return <CardComponent
                    key={item.id}
                    setDone={setDone}
                    setInprogress={setInprogress}
                    setPending={setPending}
                    details={item} />
                })
              }
            </div>
          </div>
          <div className='Inprogress-col'>
            <div className='upperActionPanel'>
              <div className='add-progress'>
                In Progress {inprogress.length}
              </div>
              <button className='Add-in-list' onClick={() => handleOpen("In Progress")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className='todo-list'>
              {
                inprogress?.map((item) => {
                  return <CardComponent
                    key={item.id}
                    setDone={setDone}
                    setInprogress={setInprogress}
                    setPending={setPending}
                    details={item} />
                })
              }
            </div>
          </div>
          <div className='done-col'>
            <div className='upperActionPanel'>
              <div className='add-done'>
                Completed {done.length}
              </div>
              <button className='Add-in-list' onClick={() => handleOpen("Compeleted")}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className='todo-list'>
              {
                done?.map((item) => {
                  return <CardComponent
                    key={item.id}
                    setDone={setDone}
                    setInprogress={setInprogress}
                    setPending={setPending}
                    details={item} />
                })
              }
            </div>
          </div>
        </div >
      </div>

      {/* Modals */}
      <div
        className="custom-modal"
        style={{ display: open ? "block" : "none" }}
      >
        <div className='our-form'>
          <div className='form-heading'>Add Task - {selectedPanel}</div>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="input-group">
              <label htmlFor="heading" className="small-label">
                To-do
              </label>
              <input
                placeholder='Enter todo'
                type="text"
                id="heading"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="finishTime" className="small-label">
                Deadline
              </label>
              <input
                type="datetime-local"
                id="finishTime"
                name="finishTime"
                value={formData.finishTime}
                onChange={handleInputChange}
                required
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label htmlFor="priority" className="small-label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className='modal-btn'>
              <button className='add-button' type='submit' onClick={handleClose}>
                Add
              </button>
              <button className='cancel-button' onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div >
    </div>
  )
}

export default App
