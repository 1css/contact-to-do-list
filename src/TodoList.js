import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
var ct = 0;

const TodoList = () => {
  const [tovalue, setValue] = useState("");
  const [tovalue2, setValue2] = useState("");
  const [display, setDisplay] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  function handlefunc(e) {
    setValue(e.target.value);
  }

  function handlefunc2(e) {
    setValue2(e.target.value);
  }

  function newcopy(e) {
    if (isEditing) {
      const updatedDisplay = display.map((item) => {
        if (item.id === editId) {
          return { ...item, val: tovalue, val2: tovalue2 };
        }
        return item;
      });
      setDisplay(updatedDisplay);
      setIsEditing(false);
      setEditId(null);
    } else {
      display.push({
        id: ct++,
        val: tovalue,
        val2: tovalue2,
      });
      setDisplay([...display]);
    }
    setValue("");
    setValue2("");
  }

  function handleEditClick(id) {
    const itemToEdit = display.find((todo) => todo.id === id);
    setValue(itemToEdit.val);
    setValue2(itemToEdit.val2);
    setIsEditing(true);
    setEditId(id);
  }

  function handleDeleteClick(id) {

    let text ="are you sure you want to delete";
     
    if(window.confirm(text)){
    const result = display.filter((todo) => todo.id !== id);
    setDisplay(result);
    }else{
      text ="delete contact is cancel";
    }

  }
  return (
    <div>
      <div className="create-section">
        <input
          type="text"
          placeholder="Enter the Contact"
          value={tovalue}
          onChange={handlefunc}
          className="input-field"
        />
        <br />
        <input
          type="number"
          placeholder="Enter the PhoneNumber"
          value={tovalue2}
          onChange={handlefunc2}
          className="input-field"
        />
        <br />
        <button type="submit" onClick={newcopy} id="button-key">
          {isEditing ? "Update" : "Create"}
        </button>
      </div>
      <br />
      <h2>Contact List</h2>
      <div className="item-list">
        {display.map((item, index) => {
          return (
            <div
              key={index}
              className="item"
              style={{
                backgroundColor: "white",
                padding: "10px",
                margin: "10px 0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              
                <div className="item-text">
                  
                  {/* {item.id} */}
                  <h5>Name : {item.val}</h5>
                  <p>PhoneNumber : {item.val2}</p>
                </div>
                <div className="item-action">
                  <FaEdit onClick={() => handleEditClick(item.id)} />
                  <MdDelete onClick={() => handleDeleteClick(item.id)} />
                </div>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;

