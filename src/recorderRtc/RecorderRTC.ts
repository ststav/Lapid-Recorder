import {RecorderSettings} from "../RecorderSettings/RecorderSettings";

// import {s3Upload, captureUserMedia} from "./AppUtil";

export class RecorderRTC {
    // @ts-ignore
    private settings: RecorderSettings;

    constructor(settings: RecorderSettings = new RecorderSettings()) {
        this.settings = settings;
    }

    public start() {
        return null;
    }
}
