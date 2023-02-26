import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

export const Course = () => {
  const [selected, setSelected] = useState([]);
  const [option, setOption] = useState([]);

  const [courseDetails, setCourseDetails] = useState([]);
  const [edit, setEdit] = useState(false)
  const [id, setid] = useState('')
  const [data, setdata] = useState({ coursename: "", staffName: [] });
  const url1 = 'https://61ef7787732d93001778e3c3.mockapi.io/Staff/'
  const url = 'https://61ef7787732d93001778e3c3.mockapi.io/course/'

  const options = option !== undefined && option.length > 0 ? option.map((data) => {
    return { label: data.name, value: data.name }
  }) : []
  const handlleOnchange = (e) => {
    setdata(preData => { return { ...preData, coursename: e.target.value } })
  }

  const dataPush = [];
  selected.forEach(data => dataPush.push(data.value))

  useEffect(() => {
    axios.get(url)
      .then(response => setCourseDetails(response.data));
  }, [data])

  useEffect(() => {
    axios.get(url1)
      .then(response => setOption(response.data));
  }, [])
  const onDelete = async (id) => {
    await axios.delete(`${url}${id}`).then(res => setdata({ ...data }))
  }
  const [map, setMap] = useState([])
  const onEditHandler = async (id) => {
    await axios.get(`${url}${id}`).then(res => {
      setdata((data) => {
        return { ...data, coursename: res.data.coursename }
      }); setMap(res.data.staffName)
    }
    )
    setEdit(true)
    setid(id)
  }
  useEffect(() => {
    setSelected(map !== undefined && map.length > 0 ? map.map((data) => {
      return { label: data, value: data }
    }) : [])
  }, [map])
  const handlleSubmit = (e) => {
    e.preventDefault()
    const updatedData = { ...data, staffName: dataPush }
    !edit ? axios.post(url, updatedData).then(res => {
      setdata({ coursename: "", staffName: [] });
      setSelected([]);
      setCourseDetails((preData) => {
        return [...preData, res.data]
      });
    })  : axios.put(`${url}${id}`, updatedData).then(res => {
      setdata({ coursename: "", staffName: [] });
      setSelected([res.data]);
      setEdit(!edit)
    });
  }
  return (
    <div>
      <form onSubmit={handlleSubmit}>
      <h2>Add Students Details</h2><br />
        <input type="text" name="coursename" value={data.coursename} required onChange={handlleOnchange} placeholder="Course Name" />
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={"Select"}
        /><br />
        <button type="submit">{edit ? "Update" : "Submit"}</button>
      </form>
      <br />
      <table>
        <tr className="tableheader">
          <th>Course Name</th>
          <th>Staff Name</th>
          <th>Action</th>
        </tr>
        {courseDetails.length > 0 && courseDetails !== undefined && courseDetails.map((data, index) => {
          return (<tr key={index}>
            <td>{data.coursename}</td>
            <td>{data.staffName.length > 0 && data.staffName !== undefined && data.staffName.map((dataStaff, i) => {
              return (<span key={i}>{dataStaff + " "}</span>)
            })}</td>
            <td><button className='editBtn' onClick={() => onEditHandler(data.id)}>Edit</button>  <button onClick={() => onDelete(data.id)} className='deleteBtn' >Delete</button></td>
          </tr>)
        })}
      </table>
    </div>
  )
}
