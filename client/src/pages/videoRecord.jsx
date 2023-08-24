import { useState, useRef } from "react";
import * as React from "react";
import Upload from "../components/Upload";

const mimeType = 'video/webm; codecs="opus,vp8"';

export const VideoRecorder = (linkData) => {
	const [permission, setPermission] = useState(false);

	const mediaRecorder = useRef(null);
	const camRecorder = useRef(null);

	const liveVideoFeed = useRef(null);
	const webCamVideoFeed = useRef(null);

	const [recordingStatus, setRecordingStatus] = useState("inactive");

	const [stream, setStream] = useState(null);
	const [webCamStream, setWebCamStream] = useState(null);

	const [recordedVideo, setRecordedVideo] = useState(null);
	const [camVideo, setCamVideo] = useState(null);

	const [videoChunks, setVideoChunks] = useState([]);
	const [camChunks, setCamChunks] = useState([]);

	const [stat, setstat] = useState(false);
	const [screen, setScreen] = useState(false);
	const [cam, setCam] = useState(false);

	const [open, setOpen] = useState(false);

	const [blob, setBlob] = useState();

	const [image, setImage] = useState(null);

	

	const webCamRec = async () => {
		setstat(false);
		setScreen(false);
		setCam(true);
		setRecordedVideo(null);
		//get video and audio permissions and then stream the result media stream to the videoSrc variable
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);

				setPermission(true);

				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);

				//set videostream to live feed player
				liveVideoFeed.current.srcObject = videoStream;
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const ScreenRec = async () => {
		setstat(false);
		setScreen(true);
		setCam(false);
		setRecordedVideo(null);
		//get video and audio permissions and then stream the result media stream to the videoSrc variable
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getDisplayMedia(
					videoConstraints
				);

				setPermission(true);

				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);

				setStream(combinedStream);

				//set videostream to live feed player
				liveVideoFeed.current.srcObject = videoStream;
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};
	const screenWeb = async () => {
		setstat(true);
		setScreen(false);
		setCam(false);
		setRecordedVideo(null);
		setCamVideo(null);
		//get video and audio permissions and then stream the result media stream to the videoSrc variable
		if ("MediaRecorder" in window) {
			try {
				const videoConstraints = {
					audio: false,
					video: true,
				};
				const audioConstraints = { audio: true };

				// create audio and video streams separately
				const audioStream = await navigator.mediaDevices.getUserMedia(
					audioConstraints
				);
				const videoStream = await navigator.mediaDevices.getDisplayMedia(
					videoConstraints
				);
				const webCamSepStream = await navigator.mediaDevices.getUserMedia(
					videoConstraints
				);

				setPermission(true);

				//combine both audio and video streams

				const combinedStream = new MediaStream([
					...videoStream.getVideoTracks(),
					...audioStream.getAudioTracks(),
				]);
				const WebAloneStream = new MediaStream(webCamSepStream.getVideoTracks())

				setStream(combinedStream);
				setWebCamStream(WebAloneStream);

				//set videostream to live feed player
				liveVideoFeed.current.srcObject = videoStream;
				webCamVideoFeed.current.srcObject = WebAloneStream;
			} catch (err) {
				alert(err.message);
			}
		} else {
			alert("The MediaRecorder API is not supported in your browser.");
		}
	};

	const startRecording = async () => {
		
		if(stat===true)
		{
			setRecordingStatus("recording");
			const media = new MediaRecorder(stream, { mimeType });
			const camMedia = new MediaRecorder(webCamStream, {mimeType});

		camRecorder.current = camMedia;
		mediaRecorder.current = media;


		mediaRecorder.current.start();
		camRecorder.current.start();
		

		let localVideoChunks = [];
		let localCamChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localVideoChunks.push(event.data);
		};
		camRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localCamChunks.push(event.data);
		};

		setVideoChunks(localVideoChunks);
		setCamChunks(localCamChunks);

		}
		else{
			setRecordingStatus("recording");
		const media = new MediaRecorder(stream, { mimeType });

		mediaRecorder.current = media;


		mediaRecorder.current.start();

		let localVideoChunks = [];

		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === "undefined") return;
			if (event.data.size === 0) return;
			localVideoChunks.push(event.data);
		};

		setVideoChunks(localVideoChunks);
	}
	};

	const stopRecording = async () => {
    
		
		if(stat===true){
			setPermission(false);
			setRecordingStatus("inactive");
		mediaRecorder.current.stop();
		camRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);

			setVideoChunks([]);
      stream.getTracks().forEach(function(track) {
        track.stop();
      })
		};
		camRecorder.current.onstop = () => {
			const camBlob = new Blob(camChunks, { type: mimeType });
			const camUrl = URL.createObjectURL(camBlob);
			setCamVideo(camUrl);
			setCamChunks([]);
         webCamStream.getTracks().forEach(function(track) {
        track.stop();
      })
		};
	}
	else{
		setPermission(false);
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const videoBlob = new Blob(videoChunks, { type: mimeType });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);
			setVideoChunks([]);

			stream.getTracks().forEach(function(track) {
			track.stop();
		})
			setBlob(videoBlob);
			

	 	// Extract the first frame of the video blob and convert it into an image
		    const video = document.createElement('video');
			video.src = videoUrl;

			video.addEventListener('loadeddata', () => {
			video.currentTime = 0.002;
			});

			video.addEventListener('seeked', () => {
			
			const canvas = document.createElement('canvas');
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			const ctx = canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

			canvas.toBlob(blob => {
				setImage(blob)
			  }, 'image/jpeg');
			});
		};
	}
	};
	
		 
 
	
	return (	
		  <body  style={{backgroundColor: "#555", height: "100dvh"
		  }}>
			
			  {/* <h2 style={{ textAlign: "center" }}>Video Recorder</h2> */}
			  <div className="startstop" style={{backgroundColor:"#222"}}>
			  {permission && cam && recordingStatus === "inactive" ? (
				<button onClick={startRecording} type="button">
				  Start Recording
				</button>
			  ) : null}
			  {cam && recordingStatus === "recording" ? (
				<button onClick={() => {
					setOpen(true);
					stopRecording();
				  }} type="button"  style={{ backgroundColor: "#f44336" }}>
				  Stop Recording
				</button>
			  ) : null}
			  {permission && screen && recordingStatus === "inactive" ? (
				<button onClick={startRecording} type="button">
				  Start Recording
				</button>
			  ) : null}
			  {screen && recordingStatus === "recording" ? (
				<button onClick={() => {
					setOpen(true);
					stopRecording();
				  }} type="button"  style={{ backgroundColor: "#f44336" }}>
				  Stop Recording
				</button>
			  ) : null}
			  {permission && stat && recordingStatus === "inactive" ? (
				<button onClick={startRecording} type="button" >
				  Start Recording
				</button>
			  ) : null}
			  {stat && recordingStatus === "recording" ? (
				<button onClick={stopRecording} type="button"   style={{ backgroundColor: "#f44336" }}>
				  Stop Recording
				</button>
			  ) : null}
			  </div>

			  <div className="video1">
			  <div className="video-player">
				{!recordedVideo && (!cam && !screen) && !stat ? (
				 <div >
				 <h2 style={{textAlign:"center"}}>No Preview</h2>
				 <h4> Click on the below buttons to start recording</h4>
				 </div>
				) : null}
				{!recordedVideo && (cam || screen) && !stat ? (
				  <video className="orrec" ref={liveVideoFeed} autoPlay></video>
				) : null}
				
				{recordedVideo && (cam || screen) && !stat ? (
					 <div className="video-player">
					<video className="orrec" src={recordedVideo} controls></video>				
					{/* <a download href={image}>
					   Download Recording
					 </a> */}
				</div>
					) : null}
			  
			 

				{!recordedVideo && stat ? (
				  <video id="ls" ref={liveVideoFeed} autoPlay className="liveScreen-player"></video>
				) : null}
				
				{!recordedVideo && stat ? (
				  <video id="lc" ref={webCamVideoFeed} autoPlay className="liveCam-player"></video>
				) : null}
				
				{recordedVideo && stat ? (
				  <div className="video-player">
					<video id="vs" className="ScreenRecorded" src={recordedVideo} controls></video>
					{/* <a download href={recordedVideo}>
					  Download Recording
					</a> */}
				  </div>
				) : null}
				{recordedVideo && stat ? (
				  <div className="video-player">
					<video id="vc" className="Camrecorded" src={camVideo} controls></video>
					{/* <a download href={camVideo}>
					  Download Recording
					</a> */}
				  </div>
				) : null}
				</div>
			  </div>
			 
	  
			  <div
				className="cam-controls"
				style={{
					display: "flex",
					justifyContent: "center",
					// marginBottom: "10px",
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor:"#222",
				}}
				>
				{!permission ? (
					<button
					onClick={webCamRec}
					type="button"
					style={{
						margin: "10px",
						backgroundColor: "#4CAF50",
						cursor: "pointer",
						color: "white",
						padding: "15px 32px",
						textAlign: "center",
						textDecoration: "none",
						display: "inline-block",
						fontSize: "16px",
						borderRadius: "12px",
					}}
					>
					Record WebCam
					</button>
				) : null}
				{!permission ? (
					<button
					onClick={ScreenRec}
					type="button"
					style={{
						margin: "10px",
						backgroundColor: "#008CBA",
						cursor: "pointer",
						color: "white",
						padding: "15px 32px",
						textAlign: "center",
						textDecoration: "none",
						display: "inline-block",
						fontSize: "16px",
						borderRadius: "12px",
					}}
					>
					Record Screen
					</button>
				) : null}
				{/* {!permission ? (
					<button
					onClick={screenWeb}
					type="button"
					style={{
						margin: "10px",
						backgroundColor: "#f44336",
						color: "white",
						padding: "15px 32px",
						textAlign: "center",
						textDecoration: "none",
						display: "inline-block",
						fontSize:"16px",
						borderRadius: "12px",
				}}>
									Record Both WebCam And Screen
								</button>
								) : null} */}
							</div>
							{ blob && open && image && <Upload recordedVideo={blob} coverImage={image} setOpen={setOpen} linkData={linkData} />}
							
						</body>
						
						
					);
					
				}