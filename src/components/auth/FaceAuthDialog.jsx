import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, X, AlertCircle } from "lucide-react";

const MODEL_URL = "/models";

const FaceAuthDialog = ({ open, onClose, onCapture }) => {
  const videoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [step, setStep] = useState(1); // 1: info, 2: camera

  useEffect(() => {
    let faceapi;
    async function loadAll() {
      try {
        faceapi = await import("face-api.js");
        await loadModels(faceapi);
      } catch (err) {
        setError("Failed to load face recognition models");
      }
    }
    if (open) {
      loadAll();
    }
    return () => stopVideo();
  }, [open]);

  const loadModels = async (faceapi) => {
    setLoading(true);
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    } catch (err) {
      setError("Failed to load face recognition models");
    } finally {
      setLoading(false);
    }
  };

  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          setError("Camera access denied. Please allow camera access and try again.");
        });
    } else {
      setError("Camera not supported by this browser");
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleStartCamera = () => {
    setStep(2);
    startVideo();
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
      
      const faceapi = await import("face-api.js");
      const detection = await faceapi
        .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
      
      if (!detection) {
        setError("No face detected. Please ensure your face is clearly visible and try again.");
        setLoading(false);
        return;
      }
      
      const descriptor = Array.from(detection.descriptor);
      stopVideo();
      onCapture(descriptor);
      onClose();
    } catch (err) {
      setError("Error capturing face data. Please try again.");
      console.error("Face capture error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    stopVideo();
    setStep(1);
    setError("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Face Authentication Setup</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Set Up Face Authentication</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll capture your face data to enable secure authentication for voting. 
                  This data is encrypted and stored securely.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Important:</p>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• Ensure good lighting</li>
                      <li>• Look directly at the camera</li>
                      <li>• Remove glasses if possible</li>
                      <li>• Keep your face centered</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Skip for Now
                </Button>
                <Button 
                  onClick={handleStartCamera} 
                  disabled={loading || !modelsLoaded}
                  className="flex-1"
                >
                  {loading ? "Loading..." : "Start Camera"}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold">Position Your Face</h3>
                <p className="text-sm text-muted-foreground">
                  Center your face in the camera and click capture
                </p>
              </div>
              
              <div className="relative">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  width="100%" 
                  height="240" 
                  className="rounded-lg border bg-gray-100"
                />
                <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-lg pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-500 rounded-full"></div>
                </div>
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleCapture} 
                  disabled={loading || !modelsLoaded}
                  className="flex-1"
                >
                  {loading ? "Processing..." : "Capture Face"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaceAuthDialog;
