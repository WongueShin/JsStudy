import React, { useRef, useState } from 'react';
import ReactRouterDom, { Link } from 'react-router-dom'
import './Post.css';


const Post = (props) => {
    const history = props.history;
    const [postImage, setPostImage] = useState([]);
    const [shouldPopup, setShouldPopUp] = useState(false);
    if (postImage.length === 0){
    return(
        <Wait history = {history} imagestate = {postImage} postsetter = {setPostImage} shouldPopup={shouldPopup} setShouldPopUp={setShouldPopUp}/>
    )
    }
    return(
        <Write history = {history} imagestate = {postImage} postsetter = {setPostImage}  shouldPopup={shouldPopup} setShouldPopUp = {setShouldPopUp}/>
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

const Write = ({history, imagestate, postsetter, shouldPopup, setShouldPopUp}) => {
    
    const [mainImgIndex, setMainImgIndex] = useState(0);
    const imgInput = useRef();
    const [userName, setUserName] = useState('TestUserName');
    const textInput = useRef();

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
    
    const handleSumbmit = () => {
        let feedData = {
            img: imagestate,
            text: textInput.current.value
        }
        console.log(feedData);
        history.push('/');
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
                        <div id='inputPlace'>
                            <div id='accountPlace'>
                                <div id='userProfile'></div>
                                <div id='userName'>{userName}</div>
                            </div>
                            <div id='textInput'>
                                <form id='postForm'>
                                    <textarea id='posttext' placeholder='설명을 입력하세요...' ref={textInput}/>
                                </form>
                            </div>
                        </div>
                        <div id='buttonplace'>
                            <button id='submitText' onClick={() => {handleSumbmit(textInput)}}>공유하기</button>
                        </div>
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