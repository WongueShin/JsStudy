import React, { useRef, useState } from 'react';
import ReactRouterDom, { Link } from 'react-router-dom'
import './Post.css';


const Post = (props) => {
    const history = props.history;
    const [postImage, setPostImage] = useState([]);
    const [postText, setPostText] = useState(null);
    const [shouldPopup, setShouldPopUp] = useState(false);
    console.log(postImage);
    if (postImage.length === 0){
    return(
        <Wait history = {history} imagestate = {postImage} postsetter = {setPostImage} shouldPopup={shouldPopup} setShouldPopUp={setShouldPopUp}/>
    )
    }
    return(
        <Write history = {history} imagestate = {postImage} postsetter = {setPostImage} postText= {postText} textsetter={setPostText} shouldPopup={shouldPopup} setShouldPopUp = {setShouldPopUp}/>
    )
}

function Wait ({history, imagestate, postsetter, shouldPopup, setShouldPopUp}) {
    let postImage = imagestate;
    let setPostImage = postsetter;
    const imageInput = useRef();
    if (shouldPopup === true){
        return(
        <div>
        <div id = 'container' className='exit' >
            <div id="box">
                <div id ="upline">
                    <h4 id='title'>새 게시물</h4>
                    <span id='xmark' className='exit'>X</span>
                </div>
                <div id = 'postbox'>
                <img id = 'picture'src='/Post/picturenmovie.png'/>
                <span id = 'text'>
                    사진과 동영상을 여기에 끌어다 놓으세요.
                </span>
                <form id = 'fileform' method='post' encType='multipart/form-data' onSubmit={(event)=>{event.preventDefault()}}>
                    <button id = 'selectbutton' onClick={()=> {imageInput.current.click()}}>컴퓨터에서 선택</button>
                    <input type='file' id='chooseFile' name='chooseFile' accept='image/*' onChange={e => {loadFile(e)}} ref={imageInput}/>
                </form>
                </div>
            </div>
        </div>
        <AskOneMore shouldSetter={setShouldPopUp} postSetter = {setPostImage}/>
        </div>
        );
    }
    return(
        <div id = 'container' className='exit' onClick={(e)=>{ExitPost(e, postImage, history, setShouldPopUp)}}>
            <div id="box">
                <div id ="upline">
                    <h4 id='title'>새 게시물</h4>
                    <span id='xmark' className='exit'>X</span>
                </div>
                <div id = 'postbox'>
                <img id = 'picture'src='/Post/picturenmovie.png'/>
                <span id = 'text'>
                    사진과 동영상을 여기에 끌어다 놓으세요.
                </span>
                <form id = 'fileform' method='post' encType='multipart/form-data' onSubmit={(event)=>{event.preventDefault()}}>
                    <button id = 'selectbutton' onClick={()=> {imageInput.current.click()}}>컴퓨터에서 선택</button>
                    <input type='file' id='chooseFile' name='chooseFile' accept='image/*' onChange={async e => {await loadFile(e, postImage ,setPostImage)}} ref={imageInput}/>
                </form>
                </div>
            </div>
        </div>
    );
}

const loadFile = async(e,postImage, setPostImage) =>{
    setPostImage([...postImage, {file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])}]);
    return
}

const Write = ({history, imagestate, postsetter, postText, textsetter, shouldPopup, setShouldPopUp}) => {
    
    const [mainImgIndex, setMainImgIndex] = useState(0);
    console.log(mainImgIndex); 
    const imgInput = useRef();
    const ListOfImg = () => {
        let result = [];
        if (imagestate.length < 3){
            imagestate.forEach(ele => {
                if (imagestate.indexOf(ele) === mainImgIndex){
                    result.push(<img key={imagestate.indexOf(ele)} className='imgListele' src={ele.url}
                onClick={() => setMainImgIndex(imagestate.indexOf(ele))}/>)
                }
                else{
                result.push(<img key={imagestate.indexOf(ele)} className='imgListele notselected' src={ele.url}
                onClick={() => setMainImgIndex(imagestate.indexOf(ele))}/>)}
            })    
                result.push(
                <form id = 'imgListfileform' method='post' encType='multipart/form-data' onSubmit={(event)=>{event.preventDefault()}}>
                    <input type='file' id='chooseFile' name='chooseFile' accept='image/*' onChange={async e => {await loadFile(e, imagestate ,postsetter)}} ref={imgInput}/>
                </form>);
                result.push(
                    <div id='addOnemore' onClick={()=> {imgInput.current.click()}}><div id='plus'>+</div></div>
                );
            }
        else {
            imagestate.forEach(ele => {
                if(imagestate.indexOf(ele) === mainImgIndex){
                    result.push(<img key={imagestate.indexOf(ele)} className='imgListele' src={ele.url}
                    onClick={() => setMainImgIndex(imagestate.indexOf(ele))}/>)
                }
                else{
                    result.push(<img key={imagestate.indexOf(ele)} className='imgListele notselected' src={ele.url}
                    onClick={() => setMainImgIndex(imagestate.indexOf(ele))}/>)
                }
            })
        }
        return result
    }
    

    const Writedisplay = () => {
        return(
        <div>
        <div id = 'container' className='exit'  onClick={(e)=>{ExitPost(e, imagestate, history, setShouldPopUp)}}>
            <div id="box">
                <div id ="upline">
                    <h4 id='title'>작성</h4>
                    <span id='xmark' className='exit'>X</span>
                </div>

                <div id = 'writecontent'>
                    <div id ='imgcontainer'>
                        <div id='mainImgcontainer'>
                        <img id='mainImg' src={imagestate[mainImgIndex].url}/>
                        </div>
                        <div id='imgList'>
                            <ListOfImg/>
                        </div>
                    </div>
                    <div id ='textcontainer'>
                    </div>
                </div> 
            </div>
        </div>
        </div>
        );
    }

    if (shouldPopup) {
        return(
        <div>
            <Writedisplay/>
            <AskOneMore shouldSetter={setShouldPopUp} postSetter = {postsetter}/>
        </div>
        );
    }
    return(
        <Writedisplay/>
    );
}

function ExitPost (e, postImage, history, popupSetter) {
    if(e.target.className === 'exit' && postImage.length === 0){
        popupSetter(false);
        return history.push('/');
    }
    if (e.target.className === 'exit'){
        return(
        popupSetter(true)
        );
    }
    return
}

const AskOneMore = ({shouldSetter, postSetter}) => {
    return(
        <div id='ground'>
            <div id='askbox'>
                <div id='asktext'>
                    <h3 id='ask'>게시물을 삭제하시겠어요?</h3>
                    <span id='warn'>지금 나가면 변경 사항이 모두 사라집니다.</span>
                </div>
                <Link id = 'delink' to = '/' onClick={()=>{postSetter([])}}>
                    <div id = 'del'>
                        <span id = 'deltxt'>삭제</span>   
                    </div>
                </Link>  
                <div id = 'cancle'>
                <p id ='cancletxt' onClick = {() => {shouldSetter(false)}}>
                    취소
                </p>
                </div>
            </div>
        </div>
    )
}


export default Post;