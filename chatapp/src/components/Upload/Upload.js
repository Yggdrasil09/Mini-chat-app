import React,{Component} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";

import Files from './Files';
import '../Chat/chat.css';

class Upload extends Component{
    state = {
        isUploading: false,
        progress: 0,
        files:[],
    };

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false,files : [...this.state.files,filename] });
        firebase.storage().ref("files").child(filename)
        document.getElementById('fileuploader').value="";
    };

    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <div className='header1'>
                            <h2>Uploaded Files</h2>
                        </div>
                        <Files files={this.state.files}/>
                        <div className='footer'>
                            <label className="uploadbutton">
                                <h2>Upload Your File</h2>
                                <FileUploader 
                                    id="fileuploader"
                                    hidden
                                    accept="*"
                                    storageRef={firebase.storage().ref("files")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </label>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Upload;