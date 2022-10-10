import React, { Component } from 'react'
import "../userprofile/profile.css"
class Profile extends Component {
   
    state = { 
        profileimg:"https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"
     }
    imageHandler=(e)=>{
        const reader =new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                this.setState({profileImg:reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
     }
    render() { 
        const {profileImg}=this.state
        return ( 
            <div className='page'>
            <div className='container'>
            <h5 className='heading'>Profile picture</h5>
            <div className='image'>
            <img src={profileImg} alt="" id='img' className='img'/>
            </div>
            <input type={'file'} name="image-upload" id="input" accept='.png,.jpg,.jpeg' onChange={this.imageHandler} />
            <div className='label'>
                <label htmlFor='input' className='ImgUpload'>AddPhoto</label>
            </div>
            </div>
            </div>
         );
    }
}
 
export default Profile;