import React, { useEffect,useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'


const CreateProduct = () => {
  const [name,setName]=useState('')
  const [categories,setCategories]=useState([])
  const [price,setPrice]=useState('')
  const [shipping,setShipping]=useState('')
  const [quantity,setQuantity]=useState('')
  const [description,setDescription]=useState('')
  const [category,setCategory]=useState('')
  const [photo,setPhoto]=useState("")

  const {Option}=Select

  //Get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting category.");
    }
  };

  useEffect(()=>{
    getAllCategory()
  },[])
  return (
    <Layout title={"Dashboard - Create Products"}>
         <div className="container-fluid m-3 p-3">
    <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <h1>Create Products</h1>
            <div className="m-1 w-75">
               <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                  {
                    categories?.map(ele=>(
                      <Option key={ele._id} value={ele.name}>{ele.name}</Option>
                    ))
                  }
               </Select>
               <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photo"}  
                <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                </label>
               </div>
               <div className="mb-3">
                {photo && (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt="Photo" height={"200px"} className="img img-responsive" />
                  </div>
                )}
               </div>
               
            </div>
        </div>
    </div>
    </div>
</Layout>
  )
}

export default CreateProduct