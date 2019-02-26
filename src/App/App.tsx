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
    mediaContainerFormat?: string,
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
    }

    public render() {
        const toggle=(event:React.MouseEvent<HTMLBodyElement,MouseEvent>)=>this.toggle(event);
        return (
            <body onClick={toggle}>
            {this.state.recorderState}
            </body>
        );
    }

    private toggle (event: React.MouseEvent<HTMLBodyElement,MouseEvent>) {
        return this.setState({recorderState:EState.Recording});
        this.recorderRTC.start();
    };
}

export default App;
