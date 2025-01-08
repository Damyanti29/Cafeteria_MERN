import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'

const Add = ({url}) => {
    
    const[image,setImage]=useState(null);
    const [data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })

    const onChangeHandler =(event) =>{
        const name = event.target.name;
        const value =event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler =async(event)=>{
     event.preventDefault();
     const formData = new FormData();
     formData.append("name",data.name)
     formData.append("description",data.description)
     formData.append("price",Number(data.price))
     formData.append("category",data.category)
     formData.append("image",image)
     const response =await axios.post(`${url}/api/food/add`,formData)
     if(response.data.success){
        setData({
            name:"",
            description:"",
            price:"",
            category:"salad"
        })
        alert("Food Added!!");
        setImage(false);
   
       
        
     }
     else{
        alert("Error in adding food!!");
      
     }
    }
    useEffect(()=>{
        console.log(data)
        console.log(image)
        
    },[data,image])
  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' name='image'  required/>
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
         <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' required/>
        </div>
        <div className="add-product-desc flex-col">
            <p>Product Description</p>
            <textarea  onChange={onChangeHandler} value={data.description} name='description'  rows="6" placeholder='write description' required ></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-catgeory flex-col">
                <p>Product category</p>
                <select  onChange={onChangeHandler}  name="category" id="">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="pasta">pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
             <input  onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder=' Rs.20' />
            </div>
        </div>
        <button type='submit'  className='add-btn'>Add + </button>
      </form>
    </div>
  )
}

export default Add
