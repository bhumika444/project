import React, { useState } from 'react';
import logo from './logo.jpg';

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('Bhumika Dommaraju');
  const [desc, setDesc] = useState('Hi, I am Bhumika, a graduate student from SUNY Albany, New york pursuing masters in Computer Science. I have completed my bachelors in 2023 in the field of computer science and engineering from CVR college of Engineering at Hyderabad, India. I aspire to be a software developer after my graduation.');
  const [originalName, setOriginalName] = useState(name);
  const [originalDesc, setOriginalDesc] = useState(desc);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    setOriginalName(name);
    setOriginalDesc(desc);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setName(originalName);
    setDesc(originalDesc);
    setIsEdit(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-4">
          <img src={logo} alt="Profile" className="img-fluid" style={{ maxWidth: '100%', maxHeight: 'auto' }} />
        </div>
        <div className="col-md-8">
          {isEdit ? (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  value={desc}
                  onChange={handleDescChange}
                ></textarea>
              </div>
              <button className="btn btn-dark mr-2" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <h2 className="mb-3">{originalName}</h2>
              <p>{originalDesc}</p>
              <button className="btn btn-dark" onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
