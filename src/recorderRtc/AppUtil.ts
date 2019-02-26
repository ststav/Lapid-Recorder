// type FunctionCallback = (n:number):void;

// handle user media capture
export function captureUserMedia(callback: NavigatorUserMediaSuccessCallback) {
    const params = {audio: false, video: true};

    navigator.getUserMedia(params, callback, (error) => {
        alert(JSON.stringify(error));
    });
};

export function s3Upload(fileInfo: any) {
    return new Promise((resolve, reject) => {
        getSignedUrl(fileInfo)
            .then((s3Info) => {
                // upload to S3
                const xhr = createCORSRequest('PUT', s3Info.signedUrl);
                if (xhr !== null) {
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log(xhr.status);
                            resolve(true);
                        } else {
                            console.log(xhr.status);

                            reject(xhr.status);
                        }
                    };

                    xhr.setRequestHeader('Content-Type', fileInfo.type);
                    xhr.setRequestHeader('x-amz-acl', 'public-read');

                    return xhr.send(fileInfo.data);
                }
            })
    })
}

// handle S3 upload
const getSignedUrl = (file: any) => {
    const queryString = '?objectName=' + file.id + '&contentType=' + encodeURIComponent(file.type);
    return fetch('/s3/sign' + queryString)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log('error: ', err)
        })
};

const createCORSRequest = (method: string, url: string) => {
    const xhr = new XMLHttpRequest();

    if (xhr.withCredentials != null) {
        xhr.open(method, url, true);
    } /*else if (typeof XDomainRequest !== "undefined") {
            xhr = new XDomainRequest();
            xhr.open(method, url);
        }*/ else {
        return null;
    }

    return xhr;
};
