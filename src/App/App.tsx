import * as FileSaver from "file-saver";
import * as React from 'react';
import {RecorderRTC} from "../recorderRtc/RecorderRTC";
import {RecorderSettings} from "../RecorderSettings/RecorderSettings";
import './App.css';

enum EState {
    Stop = 'StartRecording', Recording = 'StopRecording', Downloading = 'Downloading'
}

interface IAppProps {
    userData?: string,
    mediaResolutions?: string,
    mediaFramerates?: string,
    mediaBitrates?: string,
    recordingMedia?: string,
    mediaContainerFormat?: string
}

interface IAppState {
    data: string,
    recorderState: EState,
    settings: RecorderSettings,
}

class App extends React.Component<IAppProps, IAppState> {
    private recorderRTC: RecorderRTC;

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            data: this.props.userData || '',
            recorderState: EState.Stop,
            settings: new RecorderSettings(),
        };
        this.recorderRTC = new RecorderRTC(this.state.settings);
        this.saveTextFile = this.saveTextFile.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    public render() {
        return (
            <body>
            <div onClick={this.toggle}>
                <div onClick={this.saveTextFile}>download!!!</div>
                {this.state.recorderState}
            </div>
            </body>
        );
    }

    public saveTextFile() {
        const fileParams = {type: "video/webm"};
        const blob = new Blob(["Hello, world!"], fileParams);
        FileSaver.saveAs(blob, "hello world.webm");
    }

    private toggle(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        return this.setState((prevState) => ({recorderState: EState.Recording}));
        this.recorderRTC.start();
    };
}

export default App;
