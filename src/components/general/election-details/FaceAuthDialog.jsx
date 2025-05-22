import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as faceapi from "face-api.js";

const MODEL_URL = "/models";

const FaceAuthDialog = ({ open, onClose, onCapture }) => {
  const videoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    if (open) {
      startVideo();
      loadModels();
    }
    return () => stopVideo();
  }, [open]);

  const loadModels = async () => {
    setLoading(true);
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    setModelsLoaded(true);
    setLoading(false);
  };

  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleCapture = async () => {
    setError("");
    setLoading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const detection = await faceapi
        .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
      stopVideo();
      if (!detection) {
        setError("No face detected. Please try again.");
        setLoading(false);
        setTimeout(() => {
          setError("");
          onClose();
        }, 1500);
        return;
      }
      const descriptor = Array.from(detection.descriptor);
      onCapture(descriptor);
      onClose();
    } catch (err) {
      stopVideo();
      setError("Error capturing or processing image. Please try again.");
      setTimeout(() => {
        setError("");
        onClose();
      }, 1500);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Face Authentication</h2>
        <video ref={videoRef} autoPlay width="320" height="240" className="rounded border mb-2" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => { stopVideo(); onClose(); }}>Cancel</Button>
          <Button onClick={handleCapture} disabled={loading || !modelsLoaded}>Capture & Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default FaceAuthDialog; 