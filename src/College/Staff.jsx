import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
export const Staff = () => {
  const [staffDetails, setStaffDetails] = useState({ name: "", email: '', mobile: "", date: "" })
  const [staff, setStaff] = useState([])
  const [edit, setEdit] = useState(false)
  const [id, setid] = useState('')
  const url = 'https://61ef7787732d93001778e3c3.mockapi.io/Staff/'
  const handleOnChange = (e) => {
    setStaffDetails((preData) => {
      return { ...preData, [e.target.name]: e.target.value }
    })
  }
  const ref = React.useRef();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    !edit ? axios.post(url, staffDetails).then(res => {setStaffDetails({ name: "", email: '', mobile: "", date: "" });ref.current.value = "";}) : axios.put(`${url}${id}`, staffDetails).then(res => { setStaffDetails({ name: "", email: '', mobile: "", date: "" }); setEdit(!edit); ref.current.value = ""})
    toast.success("Staff Details Succesfully Added!");
  }
  useEffect(() => {
    axios.get(url).then(res => setStaff(res.data))
  }, [staffDetails])
  const onDelete = async (id) => {
    await axios.delete(`${url}${id}`).then(res => setStaffDetails({ ...staffDetails }))
    toast.error("Staff Detail Succesfully Deleted!!")
  }
  const onEditHandler = async (id) => {
    await axios.get(`${url}${id}`).then(res => setStaffDetails(res.data))
    setEdit(true)
    setid(id)
  }
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
      <h2>Add Staff Details</h2><br />
        <input placeholder='Enter Staff Name' name='name' onChange={handleOnChange} value={staffDetails.name} />
        <input placeholder='Enter Email' name='email' type="email" onChange={handleOnChange} value={staffDetails.email} />
        <input placeholder='Enter Mobile' name='mobile' type="number" onChange={handleOnChange} value={staffDetails.mobile} />
        <input placeholder='Enter' name='dob' ref={ref} type="date" onChange={handleOnChange} value={staffDetails.dob} />
        <button>{edit ? "Update" : "Submit"}</button>
      </form>
      <br />
      <table>
        <tr className="tableheader">
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>DOB</th>
          <th>Action</th>
        </tr>
        {staff.length > 0 && staff !== undefined && staff.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.mobile}</td>
              <td>{data.dob}</td>
              <td><button className='editBtn' onClick={() => onEditHandler(data.id)}>Edit</button>  <button onClick={() => onDelete(data.id)} className='deleteBtn' >Delete</button></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}
