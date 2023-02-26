import React, { useEffect, useState } from 'react'
import axios from "axios";

export const Students = () => {
  const url = 'https://61ef7787732d93001778e3c3.mockapi.io/student/'
  const url1 = 'https://61ef7787732d93001778e3c3.mockapi.io/course/'
  const [student, setStudent] = useState({})
  const [edit, setEdit] = useState(false)
  const [id, setid] = useState('')
  const [couser, setCourse] = useState([])
  const [staff, setStaff] = useState([])
  const [studentDetail, setstudentDetail] = useState([])
  const [res, setResponse] = useState([])
  const handleOnChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }
  
  useEffect(() => {
    axios.get(url1)
      .then(response => setCourse(response.data));
  }, [])
  useEffect(() => {
    student.coursename !== undefined && student.coursename !== "" && couser.length > 0 && couser.filter(data => {
      if (data.coursename === student.coursename) {
        return setStaff(data.staffName)
      }
    })
  }, [student.coursename])
  useEffect(() => {
    axios.get(url).then(res => setstudentDetail(res.data))
  }, [res])
  const onDelete = async (id) => {
    await axios.delete(`${url}${id}`).then(res => setResponse(res))
  }
  const onEditHandler = async (id) => {
    await axios.get(`${url}${id}`).then(res => setStudent(res.data))
    setEdit(true)
    setid(id)
  }
  const ref = React.useRef();
  const ref1 = React.useRef();
  const onSubmitHandle = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('image', student.studentphoto);
    !edit ? axios.post(url, student)
      .then(res => {
        setStudent({});
        ref.current.value = "";
        ref1.current.value = "";
        setResponse(res)
      })
      .catch(err => console.log(err)) : axios.put(`${url}${id}`, student)
        .then(res => {
          setStudent({});
          setEdit(!edit);
          ref.current.value = ""
          ref1.current.value = "";
          setResponse(res)
        })
        .catch(err => console.log(err));
  }
  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <h2>Add Students Details</h2><br />
        <input placeholder='Enter Name' name='name' onChange={handleOnChange} value={student.name !== undefined ? student.name : ""} />
        <input placeholder='Enter Email' name='email' type="email" onChange={handleOnChange} value={student.email !== undefined ? student.email : ""} />
        <input name='dob' type="date" ref={ref1} onChange={handleOnChange} value={student.dob !== undefined ? student.dob : ""} />
        <input placeholder='Enter bloodgroup' name='bloodgroup' onChange={handleOnChange} value={student.bloodgroup !== undefined ? student.bloodgroup : ""} />
        <input placeholder='Enter fathername' name='fathername' onChange={handleOnChange} value={student.fathername !== undefined ? student.fathername : ""} />
        <input placeholder='Enter mothername' name='mothername' onChange={handleOnChange} value={student.mothername !== undefined ? student.mothername : ""} />
        <textarea name="address" rows="3" onChange={handleOnChange} placeholder="Enter Address" value={student.address !== undefined ? student.address : ""}>
        </textarea>
        <select name="coursename" onChange={handleOnChange} value={student.coursename !== undefined ? student.coursename : ""} style={{ width: "100%" }}>
          <option value="">Select Course</option>
          {couser.length > 0 && couser !== undefined && couser.map((data) => {
            return (<option value={data.coursename} key={data.id}>{data.coursename}</option>)
          })}
        </select>
        <select name="staff" onChange={handleOnChange} value={student.staff !== undefined ? student.staff : ""} style={{ width: "100%" }}>
          <option value="">Select Staff</option>
          {staff.length > 0 && staff !== undefined && staff.map((data, i) => {
            return (<option value={data} key={i}>{data}</option>)
          })}
        </select>
        <input placeholder='Enter address' type='file' name='studentphoto' onChange={(e) => { setStudent({ ...student, studentphoto: e.target.files[0].name }) }} ref={ref} />
        <button>{edit ? "Update" : "Submit"}</button>
      </form>
      <br />
      <table>
        <tr className="tableheader">
          <th>Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Bloodgroup</th>
          <th>Fathername</th>
          <th>Mothername</th>
          <th>Address</th>
          <th>Coursename</th>
          <th>Staff</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
        {studentDetail.length > 0 && studentDetail !== undefined && studentDetail.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.dob}</td>
              <td>{data.bloodgroup}</td>
              <td>{data.fathername}</td>
              <td>{data.mothername}</td>
              <td>{data.address}</td>
              <td>{data.coursename}</td>
              <td>{data.staff}</td>
              <td><img src={data.studentphoto} /></td>
              <td><button className='editBtn' onClick={() => onEditHandler(data.id)}>Edit</button>  <button onClick={() => onDelete(data.id)} className='deleteBtn' >Delete</button></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
