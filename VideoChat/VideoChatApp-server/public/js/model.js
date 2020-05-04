const APP_ID = config.APP_ID;
const KEY_PROVIDER_DOMAIN = config.KEY_PROVIDER_DOMAIN;

class Model {
    constructor() {
        this._audioSource = null;
        this._videoSource = null;
        this._localStream = null;
        this._channel_key = null;
        this._channel = null;
        this._uid = null;
        this._client = null;
        this._streamCount = 1;
        this._columnCount = 1;
    }

    checkSystemRequirements() {
        return new Promise((resolve, reject) => {
            if (!AgoraRTC.checkSystemRequirements()) {
                reject('Your browser does not support WebRTC!');
            } else {
                resolve();
            }
        });
    }

    requestChannelKey(channel) {
        this._channel = channel;
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "https://" + KEY_PROVIDER_DOMAIN + "/channelKey?channel=" + channel,
                success: (obj) => {
                    console.log(JSON.stringify(obj));
                    this._channel_key = obj.channelKey;
                    this._uid = obj.uid;
                    if (!this._channel_key) {
                        reject(obj.Error)
                    }
                    resolve();
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    }

    setDevice() {
        AgoraRTC.getDevices(devices => {
            for (var i = 0; i !== devices.length; ++i) {
                var device = devices[i];
                if (device.kind === 'audioinput') {
                    let label = device.label;
                    if (label.startsWith('Default')) {
                        this._audioSource = device.deviceId;
                    }
                } else if (device.kind === 'videoinput') {
                    this._videoSource = device.deviceId;
                }
            }
        });
    }

    extractUrlParam(url) {
        return new Promise((resolve, reject) => {
            let channel = url.searchParams.get('channel');
            if (channel) {
                resolve(channel);
            } else {
                reject("Room id required");
            }
        });
    }

    initializeClient() {
        this._client = AgoraRTC.createClient({ mode: 'live' });
        this._client.init(APP_ID, () => {
            console.log("AgoraRTC client initialized");
            this._client.join(this._channel_key, this._channel, this._uid, uid => {
                let stream_config = {
                    streamID: uid,
                    audio: false,
                    cameraId: this._videoSource,
                    microphoneId: this._audioSource,
                    video: true,
                    screen: false
                }

                this._localStream = AgoraRTC.createStream(stream_config);
                this._localStream.setVideoProfile('720P_3');

                // The user has granted access to the camera and mic.
                this._localStream.on("accessAllowed", () => {
                    console.log("accessAllowed");
                });
                // The user has denied access to the camera and mic.
                this._localStream.on("accessDenied", () => {
                    console.log("accessDenied");
                });

                this._localStream.init(() => {
                    // console.log("getUserMedia successfully");
                    $('div#video')
                        .append(this.createVideoElement("agora_local"));
                    this._localStream.play('agora_local');
                    this._client.publish(this._localStream, err => {
                        console.log("Publish local stream error: " + err);
                    });
                    this._client.on('stream-published', evt => {
                        console.log("Publish local stream successfully");
                    });
                }, (err) => {
                    console.log("getUserMedia failed", err);
                });
            }, (err) => {
                console.log("Join channel failed", err);
            });
        }, (err) => {
            console.log("AgoraRTC client init failed", err);
        });
    }

    setUpStreamSubscription() {
        let channelKey = "";
        this._client.on('error', err => {
            console.log("Got error msg:", err.reason);
            if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                this._client.renewChannelKey(channelKey, () => {
                    console.log("Renew channel key successfully");
                }, err => {
                    console.log("Renew channel key failed: ", err);
                });
            }
        });
        this._client.on('stream-added', evt => {
            var stream = evt.stream;
            console.log("Subscribe ", stream);
            this._client.subscribe(stream, err => {
                console.log("Subscribe stream failed", err);
            });
        });
        this._client.on('stream-subscribed', evt => {
            var stream = evt.stream;
            console.log("Subscribe remote stream successfully: " + stream.getId());
            if ($('div#video #agora_remote' + stream.getId()).length === 0) {
                $('div#video')
                    .append(this.createVideoElement("agora_remote" + stream.getId()));
                this._streamCount++;
                this.revalidateHeight();
            }
            stream.play('agora_remote' + stream.getId());
        });
        this._client.on('stream-removed', evt => {
            var stream = evt.stream;
            stream.stop();
            $('#agora_remote' + stream.getId()).remove();
            console.log("Remote stream is removed " + stream.getId());
            this._streamCount--;
            this.revalidateHeight();
        });
        this._client.on('peer-leave', evt => {
            var stream = evt.stream;
            if (stream) {
                stream.stop();
                $('#agora_remote' + stream.getId()).remove();
                console.log(evt.uid + " leaved from this channel");
                this._streamCount--;
                this.revalidateHeight();
            }
        });
    }

    createVideoElement(id) {
        let div = document.createElement('div');
        div.setAttribute('id', id);
        div.setAttribute('class', 'video_div');
        return div;
    }

    revalidateHeight() {
        let calculated_col = Math.ceil(this._streamCount / 4);
        let col = this._columnCount;
        console.log("col: " + col + ", calculated_col: " + calculated_col);
        if (calculated_col != col) {
            this._columnCount = calculated_col;
            let i = 0;
            var divs = document.getElementsByClassName('video_div');
            for (i = 0; i < divs.length; i++) {
                divs[i].style.height = '' + (100 / calculated_col - 2) + '%';
            }
        }
    }
}