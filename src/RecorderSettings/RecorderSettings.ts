interface IMediaContainerFormat {
    mimeType?: string,
    fileExtension?: string,
    recorderType?: string,
    type?: string,
}

interface IRecorderSettings {
    /*    mediaResolutions?: IMediaResolutions;
        mediaFramerates?: number| null;
        mediaBitrates?: number| null;
        recordingMedia?: IRecordingMedia;*/
    mediaContainerFormat?: IMediaContainerFormat;
}

/*const defaultmediaFramerates = null;
const defaultMediaBitrates = null;*/
const defaultMediaContainerFormat: IMediaContainerFormat = {
    mimeType: 'video/webm',
    fileExtension: 'webm',
    recorderType: '',
    type: 'video',
};

export class RecorderSettings {
    private settings: IRecorderSettings;

    public constructor(
        /*   mediaResolutions: string = JSON.stringify(defaultMediaContainerFormat),
           mediaFramerates: number|null = defaultmediaFramerates,
           mediaBitrates: number|null = defaultMediaBitrates,
           recordingMedia: string= JSON.stringify({}),*/
        mediaContainerFormat: string = JSON.stringify(defaultMediaContainerFormat)) {
        this.settings = {
            /*        this.settings.mediaBitrates = mediaBitrates;
                    this.settings.mediaFramerates = mediaFramerates;
                    this.settings.mediaResolutions = JSON.parse(mediaResolutions);
                    this.settings.recordingMedia = JSON.parse(recordingMedia);*/
            mediaContainerFormat: JSON.parse(mediaContainerFormat),
        }
    }

    public getSettings() {
        return this.settings;
    }
}