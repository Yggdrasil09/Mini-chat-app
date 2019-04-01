import React,{Component} from 'react';

class Files extends Component{
    render(){
        const Filedisplay = (filename) => {
            return(
                <div key={filename} className="uploadedfile">
                    <span>{filename}</span>
                </div>
            );
        }

        const display = this.props.files.map((filename) =>
            Filedisplay(filename)
        );

        return(
            <div className="File">
                {display}
            </div>
        );
    }
}

export default Files;